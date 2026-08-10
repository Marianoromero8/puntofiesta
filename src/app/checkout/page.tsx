'use client';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/store/cart';
import { createOrder } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AlertTriangle, X } from 'lucide-react';
import type { PFDeliveryMethod } from '@/lib/types';
import { fmtMoney } from '@/lib/format';

interface FormData {
  clientName: string;
  clientSurname: string;
  clientEmail: string;
  clientPhone: string;
  clientDni: string;
  clientCuil: string;
  clientAddress: string;
  deliveryMethod: PFDeliveryMethod;
}

const EMPTY_FORM: FormData = {
  clientName: '',
  clientSurname: '',
  clientEmail: '',
  clientPhone: '',
  clientDni: '',
  clientCuil: '',
  clientAddress: '',
  deliveryMethod: 'PICKUP',
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const justSubmittedRef = useRef(false);

  useEffect(() => {
    useCart.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0 && !justSubmittedRef.current) {
      router.replace('/');
    }
  }, [mounted, items.length, router]);

  if (!mounted) return null;
  if (items.length === 0) return null;

  const cleanPhone = (v: string) => v.replace(/\D/g, '').replace(/^(549|54)/, '').replace(/^0/, '');

  const handleCuilChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;
    if (digits.length > 10) formatted = `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
    else if (digits.length > 2) formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
    setForm({ ...form, clientCuil: formatted });
    setErrors({ ...errors, clientCuil: undefined });
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.clientName.trim()) e.clientName = 'Requerido';
    if (!form.clientSurname.trim()) e.clientSurname = 'Requerido';
    if (!form.clientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)) e.clientEmail = 'Email inválido';
    if (!/^291\d{7}$/.test(cleanPhone(form.clientPhone))) e.clientPhone = 'Ingresá un número de Bahía Blanca (291 + 7 dígitos, ej: 2915262746)';
    if (!/^\d{7,8}$/.test(form.clientDni.trim())) e.clientDni = 'Ingresá un DNI válido (7 u 8 dígitos)';
    if (!/^\d{2}-\d{8}-\d$/.test(form.clientCuil)) e.clientCuil = 'Formato: 20-12345678-9';
    if (!form.clientAddress.trim()) e.clientAddress = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const order = await createOrder({
        ...form,
        clientPhone: cleanPhone(form.clientPhone),
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });
      justSubmittedRef.current = true;
      clearCart();
      sessionStorage.setItem('pf-last-order', JSON.stringify(order));
      router.push('/confirmacion');
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Error al enviar el pedido. Intentá de nuevo.'
      );
      setSubmitting(false);
    }
  };

  const field = (key: keyof FormData, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="text-xs font-semibold text-gray-600 block mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: undefined }); }}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-0.5">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-black mb-6">Completá tu pedido</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:col-span-1">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              ¿Cómo recibís tu pedido? *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, deliveryMethod: 'PICKUP' })}
                className={`px-3 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${
                  form.deliveryMethod === 'PICKUP'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-black/50'
                }`}
              >
                🏪 Retiro en el local
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, deliveryMethod: 'DELIVERY' })}
                className={`px-3 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${
                  form.deliveryMethod === 'DELIVERY'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-black/50'
                }`}
              >
                🚚 Envío a domicilio
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {field('clientName', 'Nombre *', 'text', 'Juan')}
            {field('clientSurname', 'Apellido *', 'text', 'García')}
          </div>
          {field('clientEmail', 'Email *', 'email', 'juan@mail.com')}
          {field('clientPhone', 'Celular *', 'tel', '291 5262746')}
          <div className="grid grid-cols-2 gap-3">
            {field('clientDni', 'DNI *', 'text', '12345678')}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">CUIL / CUIT *</label>
              <input
                type="text"
                value={form.clientCuil}
                onChange={(e) => handleCuilChange(e.target.value)}
                placeholder="20-12345678-9"
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors ${errors.clientCuil ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              />
              {errors.clientCuil && <p className="text-xs text-red-500 mt-0.5">{errors.clientCuil}</p>}
            </div>
          </div>
          {field('clientAddress', 'Dirección *', 'text', 'Av. Corrientes 1234, CABA')}

          {submitError && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 flex-1">{submitError}</p>
              <button
                type="button"
                onClick={() => setSubmitError(null)}
                aria-label="Cerrar"
                className="text-red-400 hover:text-red-600 transition-colors cursor-pointer shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full bg-[#DC1414] text-white font-black py-3.5 rounded-xl hover:bg-[#C81414] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
          >
            {submitting ? 'Enviando pedido...' : 'Confirmar pedido'}
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-fit md:col-span-1">
          <h2 className="font-bold text-gray-700 text-sm mb-3">Resumen del pedido</h2>
          <p className="text-xs font-semibold text-black mb-3">
            {form.deliveryMethod === 'PICKUP' ? '🏪 Retiro en el local' : '🚚 Envío a domicilio'}
          </p>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                <span className="font-semibold">{fmtMoney(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-black text-black">
            <span>Total</span>
            <span>{fmtMoney(totalPrice())}</span>
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            Al confirmar tu pedido te vamos a contactar por WhatsApp con los datos para realizar la transferencia.
          </p>
        </div>
      </div>
    </div>
  );
}

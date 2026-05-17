'use client';

import { useState } from 'react';

type Errors = Record<string, string>;

export function ClubSubmitForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    setStatus('loading');
    setErrors({});
    const resp = await fetch('/api/submit/club', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
      setErrors(data.errors ?? { form: data.error ?? 'Ошибка отправки' });
      setStatus('error');
      return;
    }

    setStatus('success');
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-3xl bg-white p-6 shadow-soft">
      <h1 className="text-3xl font-semibold">Заявка на добавление клуба</h1>
      <Input name="clubName" label="Название клуба" error={errors.clubName} required />
      <Input name="city" label="Город" error={errors.city} required />
      <Input name="contactName" label="Контактное имя" error={errors.contactName} required />
      <Input name="contactEmail" label="Email" type="email" error={errors.contactEmail} required />
      <Input name="instagram" label="Instagram (ссылка)" error={errors.instagram} />
      <TextArea name="description" label="Описание" error={errors.description} />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <button className="rounded-xl bg-ink px-4 py-2 text-white" disabled={status === 'loading'}>
        {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
      </button>
      {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
      {status === 'success' && <p className="text-sm text-green-700">Спасибо! Заявка отправлена.</p>}
    </form>
  );
}

function Input({ name, label, error, required, type = 'text' }: { name: string; label: string; error?: string; required?: boolean; type?: string }) {
  return <label className="block text-sm"><span className="mb-1 block font-medium">{label}</span><input name={name} type={type} required={required} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />{error && <span className="text-red-600">{error}</span>}</label>;
}

function TextArea({ name, label, error }: { name: string; label: string; error?: string }) {
  return <label className="block text-sm"><span className="mb-1 block font-medium">{label}</span><textarea name={name} rows={5} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />{error && <span className="text-red-600">{error}</span>}</label>;
}

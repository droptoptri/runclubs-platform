import Image from 'next/image';
import type { ClubRecord } from '@/lib/types';

export function ClubCard({ club }: { club: ClubRecord }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft">
      {club.photoUrl ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={club.photoUrl}
            alt={club.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold">{club.name}</h3>
        <p className="text-sm text-ink/60">{club.city}</p>
        {club.description ? <p className="mt-auto text-sm text-ink/70">{club.description}</p> : null}
      </div>
    </article>
  );
}

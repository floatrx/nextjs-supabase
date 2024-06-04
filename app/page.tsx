import { title } from '@/components/primitives';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-center text-center">
        <h1>
          <span className={title()}>Testing&nbsp;</span>
          <span className={title({ color: 'green' })}>Supabase&nbsp;</span>
        </h1>
      </div>
    </section>
  );
}

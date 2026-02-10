export default function BlogLayout({ children }: React.PropsWithChildren) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-bloc w-full justify-center">{children}</div>
    </section>
  );
}

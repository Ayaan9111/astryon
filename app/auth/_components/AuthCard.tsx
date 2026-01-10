export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md bg-[#111118] border border-[#27272a] rounded-xl p-8 shadow-xl">
      <h1 className="text-2xl font-semibold mb-6 text-white">
        {title}
      </h1>
      {children}
    </div>
  );
}
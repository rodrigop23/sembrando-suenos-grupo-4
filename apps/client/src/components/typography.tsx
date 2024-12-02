export function Typography({
  variant,
  children,
}: {
  variant: "h1" | "h2" | "h3";
  children: React.ReactNode;
}) {
  const variants = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  };

  return <div className={variants[variant]}>{children}</div>;
}

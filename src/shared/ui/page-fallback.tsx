type PageFallbackProps = {
  title: string;
  description: string;
};

export const PageFallback = ({ title, description }: PageFallbackProps) => {
  return (
    <section className='space-y-2'>
      <h1 className='text-content-primary text-xl font-semibold'>{title}</h1>
      <p className='text-content-secondary text-sm'>{description}</p>
    </section>
  );
};

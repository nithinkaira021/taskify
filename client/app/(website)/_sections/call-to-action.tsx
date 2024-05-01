import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <div className="glassmorphism z-10 py-12 border-t mt-24 px-6">
      <div className="max-w-screen-lg mx-auto">
        <div className="sm:grid sm:grid-cols-3 sm:gap-8">
          <div className="sm:col-span-2 space-y-4 text-center sm:text-left">
            <h3 className="subheading text-2xl">Convinced yet?</h3>
            <p className="text-muted-foreground max-w-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque,
              dolore omnis. Sit aliquam nobis excepturi!
            </p>
          </div>
          <div className="sm:col-span-1 flex sm:flex-col gap-4 justify-center mt-8 sm:mt-0">
            <Button className="sm:hidden transition-all duration-300 rounded-full border-primary border shadow-lg shadow-primary/75 max-w-[12rem]">
              Sign up for free
            </Button>
            <Button
              className="sm:hidden rounded-full max-w-[12rem]"
              variant="outline"
            >
              Explore more
            </Button>
            <Button
              size="lg"
              className="hidden sm:block transition-all duration-300 rounded-full border-primary border shadow-lg shadow-primary/75 max-w-[12rem]"
            >
              Sign up for free
            </Button>
            <Button
              size="lg"
              className="hidden sm:block rounded-full max-w-[12rem]"
              variant="outline"
            >
              Explore more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Route, Gauge, Wrench } from 'lucide-react';
import { APP_NAME } from '@biker-app/shared';
const slides = [
  {
    icon: Route,
    title: 'Track Every Ride',
    description: 'GPS-powered ride tracking with live speed, distance and route mapping.',
  },
  {
    icon: Gauge,
    title: 'Performance Data',
    description: 'Detailed stats for every trip — speed, elevation, fuel economy and more.',
  },
  {
    icon: Wrench,
    title: 'Maintenance on Point',
    description: 'Never miss an oil change or service interval. Your bike stays road-ready.',
  },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-6">
      {/* Logo */}
      <div className="flex items-center justify-between pt-16 pb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          {APP_NAME}
          <span className="text-primary">.</span>
        </h1>
        {step < slides.length - 1 && (
          <button
            onClick={() => navigate('/login')}
            className="min-h-[48px] text-sm font-medium text-muted-foreground"
          >
            Skip
          </button>
        )}
      </div>

      {/* Slide content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
              {(() => {
                const Icon = slides[step].icon;
                return <Icon size={40} className="text-primary" />;
              })()}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {slides[step].title}
            </h2>
            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              {slides[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots & CTA */}
      <div className="pb-12">
        <div className="mb-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-primary' : 'w-1.5 bg-muted'
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground active:opacity-90"
        >
          {step === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;

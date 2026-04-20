'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import { scenarioFromIncome } from '@/lib/flow';

const eduOptions = [
  "I did not complete high school",
  "High school diploma or GED",
  "Some college, no degree",
  "Associate degree (AA, AS)",
  "Bachelor's degree or higher",
];

const yearsOptions = ["1–3", "4–5", "6+"];

const incomeOptions = [
  { label: 'Less than $30,000', band: 'under30' },
  { label: '$30,000 – $100,000', band: 'under100' },
  { label: '$100,000 – $200,000', band: '100to200' },
  { label: 'Over $200,000', band: 'over200' },
];

type Step = 'edu' | 'years' | 'income';

const progressWidth: Record<Step, string> = {
  edu: 'w-1/3',
  years: 'w-2/3',
  income: 'w-full',
};

export default function PQL() {
  const router = useRouter();
  const { setScenario } = useFlow();
  const [step, setStep] = useState<Step>('edu');
  const [edu, setEdu] = useState('');
  const [years, setYears] = useState('');
  const [income, setIncome] = useState('');

  function handleEduNext() {
    if (!edu) return;
    setStep('years');
  }

  function handleYearsNext() {
    if (!years) return;
    setStep('income');
  }

  function handleIncomeContinue() {
    if (!income) return;
    const scenario = scenarioFromIncome(income);
    setScenario(scenario);
    router.push('/eligibility');
  }

  const RadioList = ({
    options, selected, onSelect,
  }: { options: string[]; selected: string; onSelect: (v: string) => void }) => (
    <div className="space-y-2 mb-6">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left"
          style={{
            background: selected === opt ? '#2E3035' : '#13141A',
            border: `1px solid ${selected === opt ? '#FFFFFF30' : '#2E3035'}`,
          }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
            style={{ borderColor: selected === opt ? '#F5F5F7' : '#555' }}
          >
            {selected === opt && (
              <div className="w-2 h-2 rounded-full" style={{ background: '#F5F5F7' }} />
            )}
          </div>
          <span className="text-sm" style={{ color: '#F5F5F7' }}>{opt}</span>
        </button>
      ))}
    </div>
  );

  return (
    <Shell track="scholarship">
      <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#9EA3AE' }}>
        Scholarship application
      </p>

      <div className="h-1 rounded-full mb-5 overflow-hidden" style={{ background: '#2E3035' }}>
        <div className={`h-1 rounded-full ${progressWidth[step]} transition-all duration-300`}
          style={{ background: '#D7FF3A' }} />
      </div>

      {step === 'edu' && (
        <>
          <h1 className="text-xl font-bold mb-5" style={{ color: '#F5F5F7' }}>
            What is the highest level of education you&apos;ve completed?
          </h1>
          <RadioList options={eduOptions} selected={edu} onSelect={setEdu} />
          <button
            onClick={handleEduNext}
            disabled={!edu}
            className="w-full rounded-full py-4 font-semibold text-sm disabled:opacity-40"
            style={{ background: '#FFFFFF', color: '#13141A' }}
          >
            Next
          </button>
        </>
      )}

      {step === 'years' && (
        <>
          <h1 className="text-xl font-bold mb-5" style={{ color: '#F5F5F7' }}>
            How many years have you spent in higher education?
          </h1>
          <RadioList options={yearsOptions} selected={years} onSelect={setYears} />
          <button
            onClick={handleYearsNext}
            disabled={!years}
            className="w-full rounded-full py-4 font-semibold text-sm disabled:opacity-40"
            style={{ background: '#FFFFFF', color: '#13141A' }}
          >
            Next
          </button>
          <button onClick={() => setStep('edu')} className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}>
            ← Back
          </button>
        </>
      )}

      {step === 'income' && (
        <>
          <h1 className="text-xl font-bold mb-5" style={{ color: '#F5F5F7' }}>
            What is your annual household income?
          </h1>
          <div className="space-y-2 mb-6">
            {incomeOptions.map(({ label, band }) => (
              <button
                key={band}
                onClick={() => setIncome(band)}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left"
                style={{
                  background: income === band ? '#2E3035' : '#13141A',
                  border: `1px solid ${income === band ? '#FFFFFF30' : '#2E3035'}`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                  style={{ borderColor: income === band ? '#F5F5F7' : '#555' }}
                >
                  {income === band && (
                    <div className="w-2 h-2 rounded-full" style={{ background: '#F5F5F7' }} />
                  )}
                </div>
                <span className="text-sm" style={{ color: '#F5F5F7' }}>{label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleIncomeContinue}
            disabled={!income}
            className="w-full rounded-full py-4 font-semibold text-sm disabled:opacity-40"
            style={{ background: '#FFFFFF', color: '#13141A' }}
          >
            Continue
          </button>
          <button onClick={() => setStep('years')} className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}>
            ← Back
          </button>
        </>
      )}
    </Shell>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';
import { useFlow } from '@/components/FlowProvider';
import { scenarioFromIncome } from '@/lib/flow';
import { ExternalLink } from 'lucide-react';

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

type Step = 'edu' | 'disqualify' | 'loans' | 'years' | 'income';

const progressSteps: Record<Step, number> = {
  edu: 1, loans: 2, years: 3, income: 4, disqualify: 1,
};
const TOTAL_STEPS = 4;

export default function PQL() {
  const router = useRouter();
  const { setScenario } = useFlow();
  const [step, setStep] = useState<Step>('edu');
  const [edu, setEdu] = useState('');
  const [loans, setLoans] = useState('');
  const [years, setYears] = useState('');
  const [income, setIncome] = useState('');

  function handleEduNext() {
    if (!edu) return;
    if (edu === "I did not complete high school") {
      setStep('disqualify');
    } else {
      setStep('loans');
    }
  }

  function handleIncomeContinue() {
    if (!income) return;
    const scenario = scenarioFromIncome(income);
    setScenario(scenario);
    router.push('/eligibility');
  }

  const progress = progressSteps[step];

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

      {step !== 'disqualify' && (
        <div className="h-1 rounded-full mb-5 overflow-hidden" style={{ background: '#2E3035' }}>
          <div
            className="h-1 rounded-full transition-all duration-300"
            style={{ background: '#D7FF3A', width: `${(progress / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      )}

      {/* Step 1 — Education */}
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

      {/* Disqualify screen */}
      {step === 'disqualify' && (
        <>
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: '#2E1A1A' }}>
              🎓
            </div>
          </div>
          <h1 className="text-xl font-bold mb-3 text-center" style={{ color: '#F5F5F7' }}>
            A high school diploma is required
          </h1>
          <p className="text-sm mb-4 text-center" style={{ color: '#9EA3AE' }}>
            To earn an accredited U.S. degree, federal regulations require a high school diploma or its equivalent (GED). Without one, we&apos;re unable to enroll you in a degree program at this time.
          </p>
          <div className="rounded-2xl p-4 mb-5" style={{ background: '#13141A', border: '1px solid #2E3035' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#D7FF3A' }}>Coming soon</p>
            <p className="text-sm mb-3" style={{ color: '#F5F5F7' }}>
              We&apos;re launching an open-enrollment track — no degree required. Study any subject, at your own pace.
            </p>
            <a
              href="https://maestroai.org"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full py-3 font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: '#2E3035', color: '#F5F5F7' }}
            >
              <ExternalLink className="w-4 h-4" />
              Join the waitlist
            </a>
          </div>
          <button
            onClick={() => { setEdu(''); setStep('edu'); }}
            className="w-full text-xs"
            style={{ color: '#9EA3AE' }}
          >
            ← Back
          </button>
        </>
      )}

      {/* Step 2 — Student loans */}
      {step === 'loans' && (
        <>
          <h1 className="text-xl font-bold mb-5" style={{ color: '#F5F5F7' }}>
            Are you in default on any student loans?
          </h1>
          <RadioList options={['Yes', 'No']} selected={loans} onSelect={setLoans} />
          <button
            onClick={() => { if (loans) setStep('years'); }}
            disabled={!loans}
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

      {/* Step 3 — Years in HE */}
      {step === 'years' && (
        <>
          <h1 className="text-xl font-bold mb-5" style={{ color: '#F5F5F7' }}>
            How many years have you spent in higher education?
          </h1>
          <RadioList options={yearsOptions} selected={years} onSelect={setYears} />
          <button
            onClick={() => { if (years) setStep('income'); }}
            disabled={!years}
            className="w-full rounded-full py-4 font-semibold text-sm disabled:opacity-40"
            style={{ background: '#FFFFFF', color: '#13141A' }}
          >
            Next
          </button>
          <button onClick={() => setStep('loans')} className="mt-3 w-full text-xs" style={{ color: '#9EA3AE' }}>
            ← Back
          </button>
        </>
      )}

      {/* Step 4 — Income */}
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

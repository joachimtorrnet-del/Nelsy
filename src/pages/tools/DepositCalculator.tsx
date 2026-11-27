import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { NumberField, ResultLine, Prose, PINK } from '@/components/tools/ToolPage';

const money = (n: number) => `$${(Number.isFinite(n) ? n : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const link = 'underline text-[#F52B8C]';

type DepositType = 'percent' | 'fixed';

export default function DepositCalculator() {
  const [price, setPrice] = useState(80);
  const [type, setType] = useState<DepositType>('percent');
  const [value, setValue] = useState(25);
  const [feePct, setFeePct] = useState(2.9);
  const [feeFixed, setFeeFixed] = useState(0.3);

  const rawDeposit = type === 'percent' ? (price * Math.min(value, 100)) / 100 : value;
  const deposit = Math.min(rawDeposit, price);
  const balance = price - deposit;
  const rawFee = deposit > 0 ? (deposit * Math.min(feePct, 100)) / 100 + feeFixed : 0;
  // A fee can't take more than the deposit itself: flag it instead of showing a negative payout.
  const feeEatsDeposit = deposit > 0 && rawFee >= deposit;
  const fee = Math.min(rawFee, deposit);
  const net = deposit - fee;
  const depositShare = price > 0 ? (deposit / price) * 100 : 0;

  const calculator = (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Your service and deposit</h2>
        <NumberField label="Service price" value={price} onChange={setPrice} prefix="$" step={0.01} />
        <div>
          <p className="block text-sm font-semibold text-gray-700 mb-2">Deposit type</p>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Deposit type">
            {([['percent', 'Percentage'], ['fixed', 'Fixed amount']] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={type === key}
                onClick={() => setType(key)}
                className={`rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors ${type === key ? 'text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                style={type === key ? { background: PINK, borderColor: PINK } : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <NumberField
          label={type === 'percent' ? 'Deposit percentage' : 'Deposit amount'}
          value={value}
          onChange={setValue}
          step={type === 'percent' ? 1 : 0.01}
          max={type === 'percent' ? 100 : undefined}
          prefix={type === 'fixed' ? '$' : undefined}
          suffix={type === 'percent' ? '%' : undefined}
        />
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Card fee (%)" value={feePct} onChange={setFeePct} step={0.01} max={100} suffix="%" hint="From your payment provider" />
          <NumberField label="Fixed fee per payment" value={feeFixed} onChange={setFeeFixed} step={0.01} prefix="$" hint="Per transaction" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-1">Your deposit</h2>
        <p className="text-xs text-gray-400 mb-3">Updates as you type</p>
        <ResultLine label="Deposit charged at booking" value={money(deposit)} formula={type === 'percent' ? 'price × deposit %' : 'fixed amount (capped at the price)'} highlight />
        <ResultLine label="Balance due at the appointment" value={money(balance)} formula="price − deposit" />
        <ResultLine label="Card fee on the deposit" value={money(fee)} formula="deposit × fee % + fixed fee" />
        <ResultLine label="Net deposit you receive" value={money(net)} formula="deposit − card fee" />
        <ResultLine label="Deposit as a share of the price" value={`${depositShare.toFixed(1)}%`} />
        {feeEatsDeposit && (
          <p className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 leading-relaxed">
            The card fee is as large as the deposit, so you would keep nothing from it. Raise the deposit or check the fee figures.
          </p>
        )}
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Example values are pre-filled. The card fee figures are only an example: enter the rate from your own payment provider. The balance may also carry a card fee if the client pays it by card.
        </p>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="deposit-calculator"
      name="Deposit Calculator"
      seoTitle="Deposit Calculator for Beauty Appointments"
      seoDescription="Free deposit calculator for nail techs and beauty pros: work out the deposit, the balance due, the card fee on the deposit and what you actually receive."
      h1="Deposit Calculator"
      intro="Work out how much deposit to take for a service, what the client still owes at the appointment, and what lands in your account after card fees. Built for nail techs, lash artists, brow artists and every beauty pro who books by appointment."
      calculator={calculator}
      toc={[
        { id: 'formula', label: 'How the deposit is calculated' },
        { id: 'examples', label: 'Two worked examples' },
        { id: 'percent-vs-fixed', label: 'Percentage or fixed deposit?' },
        { id: 'fees', label: 'Card fees on deposits' },
        { id: 'policy', label: 'Write it into your policy' },
      ]}
      faq={[
        { q: 'How do I calculate a deposit for a beauty appointment?', a: 'For a percentage deposit, multiply the service price by the percentage: 25% of an $80 service is $20. For a fixed deposit, you charge the same amount whatever the service. The balance due at the appointment is the price minus the deposit.' },
        { q: 'Should the deposit be deducted from the final price?', a: 'In most booking policies, yes: the deposit is part of the price, not an extra charge, and the client pays the balance at the appointment. Say it clearly on your booking page so clients know what they still owe.' },
        { q: 'Do card fees apply to deposits?', a: 'If the deposit is paid by card online, your payment provider usually charges a percentage plus a fixed fee per payment. Because the fixed part is charged on every payment, it weighs more on a small deposit than on a large one.' },
        { q: 'Is a percentage or a fixed deposit better?', a: 'A percentage scales with the price, so long and expensive services are better protected. A fixed amount is simpler to explain. Many pros use a fixed amount for short services and a percentage for long sets or new clients.' },
      ]}
      cta={{ title: 'Take deposits automatically at booking', text: 'With Nelsy, clients pay the deposit when they book from your page, and you keep 100% of it: 0% Nelsy commission, only standard Stripe processing fees.' }}
      related={[
        { label: 'How much deposit should a nail tech charge?', href: '/blog/how-much-deposit-should-nail-tech-charge' },
        { label: 'Nail tech deposit policy', href: '/blog/nail-tech-deposit-policy' },
        { label: 'How to collect deposits as a nail tech', href: '/nail-tech-deposits' },
        { label: 'No-show cost calculator', href: '/tools/no-show-cost-calculator' },
        { label: 'Cancellation policy generator', href: '/tools/nail-tech-cancellation-policy-generator' },
      ]}
    >
      <Prose id="formula" title="How the deposit is calculated">
        <p><strong>Percentage deposit = service price × deposit %.</strong> <strong>Fixed deposit = the amount you set</strong>, capped at the service price.</p>
        <p><strong>Balance due = service price − deposit.</strong> <strong>Card fee on the deposit = deposit × fee % + fixed fee.</strong> <strong>Net deposit = deposit − card fee.</strong></p>
      </Prose>

      <Prose id="examples" title="Two worked examples">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 1: a 25% deposit on an $80 gel manicure</p>
          <p>Deposit: $80 × 25% = <strong>$20.00</strong>. Balance at the appointment: $80 − $20 = $60.00. With an example card fee of 2.9% + $0.30: $20 × 2.9% + $0.30 = $0.58 + $0.30 = $0.88. Net deposit received: $20 − $0.88 = <strong>$19.12</strong>.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 2: a fixed $30 deposit on a $150 lash full set</p>
          <p>Deposit: <strong>$30.00</strong>, which is 20% of the price. Balance at the appointment: $150 − $30 = $120.00. With the same example card fee: $30 × 2.9% + $0.30 = $0.87 + $0.30 = $1.17. Net deposit received: $30 − $1.17 = <strong>$28.83</strong>.</p>
        </div>
        <p>The fixed part of the fee is the same in both cases, so it takes a bigger share of a smaller deposit.</p>
      </Prose>

      <Prose id="percent-vs-fixed" title="Percentage or fixed deposit?">
        <p>A <strong>percentage</strong> grows with the price, so a long set or a full day of bridal work is protected in proportion to the time you block. A <strong>fixed amount</strong> is easier to explain and to remember, which suits short services with similar prices.</p>
        <p>There is no single right amount. Choose a deposit that covers at least the cost of an empty slot without putting clients off. The guide on <Link to="/blog/how-much-deposit-should-nail-tech-charge" className={link}>how much deposit to charge</Link> walks through the options.</p>
      </Prose>

      <Prose id="fees" title="Card fees on deposits">
        <p>Most payment providers charge a percentage of each payment plus a fixed amount per transaction. Check the current rates on your provider&apos;s pricing page and enter them above: the figures pre-filled here are only an example.</p>
        <p>If the client pays the balance by card at the appointment, that second payment usually has its own fee. Taking the full price online in one payment avoids paying the fixed fee twice.</p>
      </Prose>

      <Prose id="policy" title="Write it into your policy">
        <ul className="list-disc list-inside space-y-2">
          <li>State the deposit amount or percentage for each service.</li>
          <li>Say that the deposit is deducted from the final price.</li>
          <li>Say when it is refundable or transferable (for example, cancellation more than 48 hours ahead) and when it is kept.</li>
        </ul>
        <p>The <Link to="/tools/nail-tech-cancellation-policy-generator" className={link}>cancellation policy generator</Link> writes these rules for you, and the <Link to="/tools/no-show-cost-calculator" className={link}>no-show cost calculator</Link> shows what missed appointments cost without a deposit.</p>
      </Prose>
    </ToolPage>
  );
}

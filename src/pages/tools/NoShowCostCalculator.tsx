import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { NumberField, ResultLine, Prose } from '@/components/tools/ToolPage';

const usd = (n: number) => `$${(Number.isFinite(n) ? n : 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const num = (n: number) => (Number.isFinite(n) ? n : 0).toLocaleString('en-US', { maximumFractionDigits: 1 });
const link = 'underline text-[#F52B8C]';

export default function NoShowCostCalculator() {
  const [price, setPrice] = useState(70);
  const [noShows, setNoShows] = useState(3);
  const [lateCancels, setLateCancels] = useState(4);
  const [refill, setRefill] = useState(25);
  const [deposit, setDeposit] = useState(20);

  const refillRate = Math.min(refill, 100) / 100;
  const emptyLateSlots = lateCancels * (1 - refillRate);
  const lostSlots = noShows + emptyLateSlots;
  const monthlyLost = lostSlots * price;
  const yearlyLost = monthlyLost * 12;
  const keptDeposit = Math.min(deposit, price);
  const monthlyRecovered = lostSlots * keptDeposit;
  const yearlyRecovered = monthlyRecovered * 12;
  const monthlyRemaining = monthlyLost - monthlyRecovered;

  const calculator = (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Your missed appointments</h2>
        <NumberField label="Average service price" value={price} onChange={setPrice} prefix="$" step={0.01} />
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="No-shows per month" value={noShows} onChange={setNoShows} hint="Client never arrived" />
          <NumberField label="Late cancellations per month" value={lateCancels} onChange={setLateCancels} hint="Inside your notice period" />
        </div>
        <NumberField label="Late-cancelled slots you could refill" value={refill} onChange={setRefill} max={100} suffix="%" hint="With a waitlist or last-minute posts" />
        <NumberField label="Deposit per appointment" value={deposit} onChange={setDeposit} prefix="$" step={0.01} hint="Kept when the slot is lost, per your policy" />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-1">What it costs you</h2>
        <p className="text-xs text-gray-400 mb-3">Updates as you type</p>
        <ResultLine label="Slots lost per month" value={num(lostSlots)} formula="no-shows + late cancellations × (1 − refill %)" />
        <ResultLine label="Revenue lost per month" value={usd(monthlyLost)} formula="slots lost × average price" highlight />
        <ResultLine label="Revenue lost per year" value={usd(yearlyLost)} formula="monthly loss × 12" />
        <ResultLine label={`Recovered by a ${usd(keptDeposit)} deposit, per month`} value={usd(monthlyRecovered)} formula="slots lost × deposit" />
        <ResultLine label="Recovered per year" value={usd(yearlyRecovered)} formula="monthly recovery × 12" />
        <ResultLine label="Still lost per month with the deposit" value={usd(monthlyRemaining)} />
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          This is an estimate built only from the numbers you enter, not a prediction. Example values are pre-filled: replace them with your own counts from the last few months.
        </p>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="no-show-cost-calculator"
      name="No-Show Cost Calculator"
      seoTitle="No-Show Cost Calculator for Beauty Pros"
      seoDescription="Free no-show cost calculator for nail techs and beauty pros: estimate the revenue lost to no-shows and late cancellations, and what a deposit would recover."
      h1="No-Show Cost Calculator"
      intro="Estimate what no-shows and late cancellations cost your beauty business each month and each year, and how much of it a deposit would win back. Built for nail techs, lash artists, brow artists and hairstylists."
      calculator={calculator}
      toc={[
        { id: 'formula', label: 'How the cost is calculated' },
        { id: 'examples', label: 'Two worked examples' },
        { id: 'estimate', label: 'Why this is an estimate' },
        { id: 'refill', label: 'Refilling cancelled slots' },
        { id: 'reduce', label: 'How to reduce no-shows' },
      ]}
      faq={[
        { q: 'How do I calculate the cost of a no-show?', a: 'Multiply the number of missed appointments by your average service price. For late cancellations, only count the slots you could not refill. The calculator adds both and multiplies by 12 for a yearly figure.' },
        { q: 'What is the difference between a no-show and a late cancellation?', a: 'A no-show is a client who never arrives and does not warn you. A late cancellation is a client who cancels inside the notice period set in your policy, often 24 or 48 hours. A late cancellation sometimes leaves time to refill the slot; a no-show usually does not.' },
        { q: 'How much would a deposit recover?', a: 'In this calculator, the deposit is counted once for every slot that stays empty, as if your policy lets you keep it in that case. Your real result depends on your policy and on how often you choose to waive it.' },
        { q: 'Is the result exact?', a: 'No. It is an estimate based only on the numbers you enter, and it does not assume that a deposit changes how often clients miss appointments. Use your own counts from the last few months for a figure that reflects your business.' },
      ]}
      cta={{ title: 'Protect your time with deposits', text: 'Clients pay a deposit when they book from your Nelsy page, and reminders go out automatically. 0% Nelsy commission on every booking.' }}
      related={[
        { label: 'How to handle nail client no-shows', href: '/blog/how-to-handle-nail-client-no-shows' },
        { label: 'Nail tech no-show policy examples', href: '/blog/nail-tech-no-show-policy-examples' },
        { label: 'How to fill last-minute nail appointments', href: '/blog/how-to-fill-last-minute-nail-appointments' },
        { label: 'Reduce no-shows with Nelsy', href: '/use-cases/reduce-no-shows' },
        { label: 'Deposit calculator', href: '/tools/deposit-calculator' },
      ]}
    >
      <Prose id="formula" title="How the cost is calculated">
        <p><strong>Slots lost per month = no-shows + late cancellations × (1 − refill %).</strong> A no-show is counted as lost because there is rarely time to rebook it. A late cancellation is only lost when you cannot refill it.</p>
        <p><strong>Revenue lost = slots lost × average price</strong>, then × 12 for the year. <strong>Deposit recovered = slots lost × deposit</strong>, counting the deposit as kept on every empty slot.</p>
      </Prose>

      <Prose id="examples" title="Two worked examples">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 1: a nail tech with a $70 average service</p>
          <p>3 no-shows and 4 late cancellations a month, 25% of late cancellations refilled. Slots lost: 3 + 4 × 0.75 = 6. Revenue lost: 6 × $70 = <strong>$420 a month</strong>, or $420 × 12 = <strong>$5,040 a year</strong>. A $20 deposit kept on each empty slot recovers 6 × $20 = $120 a month, or $1,440 a year.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 2: a lash artist with a $120 average service</p>
          <p>2 no-shows and 2 late cancellations a month, 50% of late cancellations refilled. Slots lost: 2 + 2 × 0.5 = 3. Revenue lost: 3 × $120 = <strong>$360 a month</strong>, or <strong>$4,320 a year</strong>. A $50 deposit recovers 3 × $50 = $150 a month, or $1,800 a year.</p>
        </div>
        <p>These figures come only from the example inputs. Your own result depends entirely on the numbers you enter.</p>
      </Prose>

      <Prose id="estimate" title="Why this is an estimate">
        <p>The calculator multiplies your own counts by your own prices. It does not know your real cancellation rate, and it does not assume that a deposit makes clients miss fewer appointments, even though many pros take deposits for that reason. Treat the result as an order of magnitude to help you decide, not as a forecast.</p>
        <p>For the most useful figure, count your no-shows and late cancellations over the last three months and divide by three.</p>
      </Prose>

      <Prose id="refill" title="Refilling cancelled slots">
        <p>A slot cancelled with a few hours&apos; notice can sometimes be filled from a waitlist or a story post. The refill percentage lets you account for that. See <Link to="/blog/how-to-fill-last-minute-nail-appointments" className={link}>how to fill last-minute appointments</Link> and <Link to="/blog/how-to-create-nail-tech-waitlist" className={link}>how to create a waitlist</Link>.</p>
      </Prose>

      <Prose id="reduce" title="How to reduce no-shows">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Take a deposit at booking.</strong> Work out the amount with the <Link to="/tools/deposit-calculator" className={link}>deposit calculator</Link>.</li>
          <li><strong>Publish a clear policy</strong> with a notice period. The <Link to="/tools/nail-tech-cancellation-policy-generator" className={link}>cancellation policy generator</Link> writes one for you.</li>
          <li><strong>Send reminders</strong> before each appointment. Use the <Link to="/tools/nail-tech-appointment-reminder-templates" className={link}>appointment reminder templates</Link>.</li>
          <li><strong>Make rescheduling easy</strong>, so clients move the appointment instead of skipping it.</li>
        </ul>
      </Prose>
    </ToolPage>
  );
}

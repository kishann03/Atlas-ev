import { Quote } from "lucide-react";

const TESTIMONIALS = [
  { quote: "I stopped checking three apps before a road trip. Atlas just tells me which station won't waste my time.", name: "Priya Sharma", role: "Tata Nexon EV owner" },
  { quote: "The reliability score flagged a station that other apps still showed as active. It saved me a 20-minute detour.", name: "Rohan Verma", role: "MG ZS EV owner" },
  { quote: "The queue estimate is scarily accurate. I time my errands around it now.", name: "Ananya Iyer", role: "Hyundai Kona Electric owner" },
  { quote: "Cost comparison alone paid for a year of chai. Networks are wildly inconsistent on pricing.", name: "Karan Mehta", role: "BYD Atto 3 owner" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-border bg-bg-surface2 py-14 md:py-20">
      <div className="container-page">
        <h2 className="max-w-3xl font-display text-4xl font-extrabold text-text-primary md:text-5xl">Trusted by drivers who plan ahead</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex flex-col justify-between border border-border-soft p-7">
              <div>
                <Quote size={30} className="text-saffron" />
                <blockquote className="mt-3 text-lg leading-8 text-text-primary">{t.quote}</blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-contrast">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span>
                  <span className="block text-base font-bold text-text-primary">{t.name}</span>
                  <span className="block text-sm text-text-secondary">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import resources from "@/data/resources";

export default function ResourceInfo() {
  const { slug } = useParams();
  const page = resources[slug];

  return (
    <MainLayout>
      <div className="container-page py-12 md:py-16">
        {page ? (
          <article className="max-w-3xl">
            <Link to="/" className="inline-flex items-center gap-2 text-base font-medium text-text-secondary hover:text-accent">
              <ArrowLeft size={18} /> Back to home
            </Link>
            <p className="mt-6 text-base font-semibold text-accent">{page.group}</p>
            <h1 className="mt-1 font-display text-5xl font-extrabold text-text-primary">{page.title}</h1>
            <p className="mt-4 text-xl text-text-secondary">{page.summary}</p>
            <div className="mt-10 space-y-8">
              {page.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-2xl font-bold text-text-primary">{s.heading}</h2>
                  <p className="mt-2 text-lg leading-8 text-text-secondary">{s.body}</p>
                </section>
              ))}
            </div>
          </article>
        ) : (
          <div className="max-w-xl">
            <h1 className="font-display text-5xl font-extrabold text-text-primary">Page not found</h1>
            <p className="mt-4 text-xl text-text-secondary">That page does not exist. Try one of the links in the footer.</p>
            <Link to="/" className="btn-primary mt-8 inline-flex">Back to home</Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

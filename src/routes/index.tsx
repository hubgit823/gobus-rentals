import { createFileRoute } from "@tanstack/react-router";
import { COMPANY } from "@/lib/company";
import { buildPageMeta } from "@/lib/seo/buildMeta";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => {
    const { meta, links } = buildPageMeta({
      title: "Error 502 - Maintenance in progress | Luxury Bus Rental",
      description:
        "Our website is temporarily under maintenance. Gateway checks are active and service will be restored shortly.",
      path: "/",
      keywords:
        "error 502, gateway issue, website maintenance, platform update, Luxury Bus Rental",
    });
    return {
      meta,
      links,
    };
  },
});

function Index() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#333]">
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-10">
        <section className="rounded-sm border border-[#dfdfdf] bg-[#f8f8f8] px-5 py-8 md:px-12">
          <h1 className="text-[44px] leading-none tracking-tight text-[#2e2e2e] md:text-[52px]">
            Error 502
          </h1>
          <p className="mt-3 text-4xl font-light text-[#626262]">Bad gateway</p>
          <p className="mt-3 text-sm text-[#777]">
            Our gateway is responding, but the origin service is temporarily unavailable.
          </p>
          <p className="mt-2 text-sm text-[#777]">
            Cloudfare maintenance window is currently active.
          </p>
        </section>

        <section className="mt-3 rounded-sm border border-[#dfdfdf] bg-[#ededed] px-4 py-8 md:px-10 md:py-10">
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
            <StatusCard title="You" subtitle="Browser" state="Working" stateClass="text-[#76b82a]" icon="browser" iconState="ok" />
            <StatusCard title="Cloudfare Gateway" subtitle="Gateway" state="Working" stateClass="text-[#76b82a]" icon="cloud" iconState="ok" />
            <StatusCard title={COMPANY.legalName} subtitle="Host" state="Error" stateClass="text-[#d33]" icon="server" iconState="error" />
          </div>

          <p className="mt-10 text-center text-sm text-[#666]">
            Service is under maintenance. Please contact our organization for any inconvenience caused.
          </p>
        </section>
      </main>
    </div>
  );
}

function StatusCard({
  title,
  subtitle,
  state,
  stateClass,
  icon,
  iconState,
}: Readonly<{
  title: string;
  subtitle: string;
  state: string;
  stateClass: string;
  icon: "browser" | "cloud" | "server";
  iconState: "ok" | "error";
}>) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[76px] w-[96px]">
        {icon === "browser" ? <BrowserIcon /> : null}
        {icon === "cloud" ? <CloudIcon /> : null}
        {icon === "server" ? <ServerIcon /> : null}
        <StatusDot type={iconState} />
      </div>
      <p className="mt-4 text-[22px] text-[#7b7b7b]">{title}</p>
      <p className="mt-1 text-[34px] font-light leading-none text-[#8a8a8a]">{subtitle}</p>
      <p className={`mt-1 text-[36px] font-medium leading-none ${stateClass}`}>{state}</p>
    </div>
  );
}

function StatusDot({ type }: Readonly<{ type: "ok" | "error" }>) {
  const isOk = type === "ok";
  return (
    <div
      className={`absolute -bottom-2 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full text-xl text-white ${
        isOk ? "bg-[#7fbf2f]" : "bg-[#c92e2e]"
      }`}
    >
      {isOk ? "✓" : "×"}
    </div>
  );
}

function BrowserIcon() {
  return (
    <svg viewBox="0 0 96 76" className="h-full w-full">
      <rect x="12" y="10" width="72" height="54" rx="8" fill="#9d9d9d" />
      <rect x="17" y="16" width="62" height="42" rx="4" fill="#ececec" />
      <rect x="17" y="16" width="62" height="8" rx="4" fill="#bcbcbc" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 96 76" className="h-full w-full">
      <path
        d="M30 58h36c11 0 20-8 20-18s-9-18-20-18h-1c-3-8-11-14-20-14-11 0-20 8-21 18h-1C13 26 5 34 5 44s8 14 25 14z"
        fill="#9d9d9d"
      />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 96 76" className="h-full w-full">
      <path d="M22 16h52l9 18v24H13V34z" fill="#9d9d9d" />
      <rect x="22" y="34" width="52" height="24" rx="4" fill="#ececec" />
      <circle cx="66" cy="46" r="4" fill="#8c8c8c" />
    </svg>
  );
}

import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Download, FileSpreadsheet, Clock } from 'lucide-react';
import { openReport, type OpenedReport } from '../lib/api';
import { reportName } from '../lib/reportNames';
import { inr, when, whenExact, howLongAgo, humanKey } from '../lib/format';
import { Empty, Spinner, Freshness } from '../components/Shell';

/**
 * One report.
 *
 * Rendering is generic on purpose. The user app has 23 bespoke report components; copying them into
 * this repo would be the drift trap the admin app fell into, and they would need the whole store
 * layer behind them. Instead this renders the SHAPE of `report_data` — scalars as a figure grid,
 * arrays of objects as tables — which works for all 42 reports and degrades honestly on any new one.
 *
 * `generated_at` is shown prominently, not tucked away. A snapshot is written when the BUSINESS
 * opens a report, so a consultant can easily be reading figures from months ago; the one thing this
 * screen must never do is let that pass unnoticed.
 */
export default function ReportView() {
  const { workplaceId = '', reportKey = '' } = useParams();
  const [params] = useSearchParams();
  const fy = params.get('fy');

  const [report, setReport] = useState<OpenedReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    openReport(workplaceId, reportKey, fy)
      .then(setReport)
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not open that report.'))
      .finally(() => setLoading(false));
  }, [workplaceId, reportKey, fy]);

  const back = (
    <Link
      to={`/client/${workplaceId}`}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-3.5 w-3.5" /> Back to reports
    </Link>
  );

  if (loading) return <><>{back}</><Spinner label="Opening report…" /></>;

  if (error) {
    return (
      <div>
        {back}
        <p className="mt-4 rounded-xl px-4 py-3 text-sm"
           style={{ background: 'hsl(var(--status-danger) / 0.1)', color: 'hsl(var(--status-danger))' }}>
          {error}
        </p>
      </div>
    );
  }

  if (!report || report.status === 'no_snapshot') {
    return (
      <div>
        {back}
        <div className="mt-6">
          <Empty
            icon={<Clock className="h-5 w-5" />}
            title="No figures yet"
            line={`${reportName(reportKey)} has been shared with you, but this business has not generated it yet. There is nothing to show until they open it once in their own app.`}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {back}

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">
            {report.report_name || reportName(report.report_key)}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {report.period_start && report.period_end
              ? `${when(report.period_start)} — ${when(report.period_end)}`
              : report.financial_year ? `FY ${report.financial_year}` : 'All periods'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {report.pdf_url && (
            <a href={report.pdf_url} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted">
              <Download className="h-3.5 w-3.5" /> PDF
            </a>
          )}
          {report.excel_url && (
            <a href={report.excel_url} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted">
              <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
            </a>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5">
        <Freshness iso={report.generated_at} ago={howLongAgo(report.generated_at)} />
        <span className="text-xs text-muted-foreground">
          Generated {whenExact(report.generated_at)} — these are the figures as they stood then, not live.
        </span>
      </div>

      <div className="mt-5">
        <RenderData data={report.report_data} />
      </div>
    </div>
  );
}

/** Numbers a business cares about are money unless the key says otherwise. */
const NON_MONEY = /(count|qty|quantity|number|rate|percent|percentage|days|ratio)/i;

function Scalar({ label, value }: { label: string; value: unknown }) {
  const numeric = typeof value === 'number';
  const display = numeric && !NON_MONEY.test(label)
    ? inr(value)
    : value === null || value === undefined || value === '' ? '—' : String(value);
  return (
    <div className="rounded-xl border border-border bg-card px-3.5 py-3">
      <p className="text-[11px] text-muted-foreground">{humanKey(label)}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums">{display}</p>
    </div>
  );
}

function Table({ rows, title }: { rows: Record<string, unknown>[]; title: string }) {
  const columns = Array.from(new Set(rows.flatMap((r) => Object.keys(r)))).slice(0, 12);
  return (
    <section className="mt-5">
      <h2 className="type-eyebrow text-muted-foreground">{humanKey(title)}</h2>
      <div className="mt-2 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[36rem] text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((c) => (
                <th key={c} className="whitespace-nowrap px-3 py-2 text-left text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {humanKey(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 200).map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {columns.map((c) => {
                  const v = r[c];
                  const money = typeof v === 'number' && !NON_MONEY.test(c);
                  return (
                    <td key={c} className={`whitespace-nowrap px-3 py-2 ${money ? 'text-right tabular-nums' : ''}`}>
                      {v === null || v === undefined ? '—'
                        : money ? inr(v)
                        : typeof v === 'object' ? JSON.stringify(v)
                        : String(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > 200 && (
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Showing the first 200 of {rows.length} rows — download the Excel file for the rest.
        </p>
      )}
    </section>
  );
}

function RenderData({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') {
    return <Empty title="Nothing to show" line="This report generated without any figures." />;
  }
  const obj = data as Record<string, unknown>;
  const scalars: [string, unknown][] = [];
  const tables: [string, Record<string, unknown>[]][] = [];
  const nested: [string, Record<string, unknown>][] = [];

  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      const rows = v.filter((r): r is Record<string, unknown> => !!r && typeof r === 'object' && !Array.isArray(r));
      if (rows.length) tables.push([k, rows]);
    } else if (v && typeof v === 'object') {
      nested.push([k, v as Record<string, unknown>]);
    } else {
      scalars.push([k, v]);
    }
  }

  return (
    <div>
      {scalars.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {scalars.map(([k, v]) => <Scalar key={k} label={k} value={v} />)}
        </div>
      )}
      {nested.map(([k, v]) => (
        <section key={k} className="mt-5">
          <h2 className="type-eyebrow text-muted-foreground">{humanKey(k)}</h2>
          <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(v)
              .filter(([, val]) => !val || typeof val !== 'object')
              .map(([kk, vv]) => <Scalar key={kk} label={kk} value={vv} />)}
          </div>
        </section>
      ))}
      {tables.map(([k, rows]) => <Table key={k} title={k} rows={rows} />)}
    </div>
  );
}

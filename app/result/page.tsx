import { ResultPanel } from "@/components/result-panel";

type ResultPageProps = {
  searchParams: Promise<{
    status?: string;
    nickname?: string;
    tx?: string;
    message?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;

  return (
    <ResultPanel
      status={params.status}
      nickname={params.nickname}
      tx={params.tx}
      message={params.message}
    />
  );
}

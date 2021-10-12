interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
}

export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Fetch failed");
    }
    return res.json() as Promise<{ data: TData; errors: Error[] }>;
  },
};

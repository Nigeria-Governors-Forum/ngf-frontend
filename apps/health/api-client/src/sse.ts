export function connectSSE<T = any>(
  url: string,
  onMessage: (data: T) => void,
  onError?: (err: Event) => void
) {
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    try {
      const parsed = JSON.parse(event.data);
      onMessage(parsed);
    } catch (err) {
      console.error("Failed to parse SSE message", err);
    }
  };

  eventSource.onerror = (err) => {
    console.error("SSE error:", err);
    if (onError) onError(err);
  };

  return () => {
    eventSource.close();
  };
}

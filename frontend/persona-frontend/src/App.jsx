import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import hermione from "./assets/hermione.jpeg";
import dumbledore from "./assets/dumbledore.jpeg";
import gabbar from "./assets/gabbar.jpeg";
import daya from "./assets/daya.jpeg";
import me from "./assets/me.jpeg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const fontStyle = document.createElement("style");
fontStyle.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); * { font-family: 'Inter', sans-serif; }`;
document.head.appendChild(fontStyle);

const PERSONAS = [
  {
    id: "hermione",
    name: "Hermione",
    img: hermione,
    color: "#df4ca7ff",
    vibe: "This isn’t magic, it’s just proper spellwork.🧚‍♂️",
  },
  {
    id: "dumbledore",
    name: "Dumbledore",
    img: dumbledore,
    color: "#ffb703ff",
    vibe: "CIt is our choices that show who we truly are.🪄",
  },
  {
    id: "gabbar",
    name: "Gabbar",
    img: gabbar,
    color: "#219ebc",
    vibe: "Kitne Aadmi The?🔪",
  },
  {
    id: "daya",
    name: "Garba Queen",
    img: daya,
    color: "#8338ec",
    vibe: "Hey Maa Mataji 🤩",
  },
];

// function MessageContent({ text }) {
//   const [copiedCode, setCopiedCode] = useState(null);

//   const copyToClipboard = (code) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     setTimeout(() => setCopiedCode(null), 2000);
//   };

//   return (
//     <div style={{ lineHeight: "1.7", fontSize: "14px" }}>
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         components={{
//           h1: ({ children }) => (
//             <h1
//               style={{
//                 fontSize: "22px",
//                 fontWeight: "700",
//                 margin: "12px 0 8px 0",
//                 borderBottom: "1px solid rgba(255,255,255,0.2)",
//                 paddingBottom: "6px",
//               }}
//             >
//               {children}
//             </h1>
//           ),
//           h2: ({ children }) => (
//             <h2
//               style={{
//                 fontSize: "19px",
//                 fontWeight: "700",
//                 margin: "10px 0 6px 0",
//               }}
//             >
//               {children}
//             </h2>
//           ),
//           h3: ({ children }) => (
//             <h3
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "600",
//                 margin: "8px 0 4px 0",
//               }}
//             >
//               {children}
//             </h3>
//           ),
//           p: ({ children }) => (
//             <p style={{ margin: "6px 0", lineHeight: "1.7" }}>{children}</p>
//           ),
//           strong: ({ children }) => (
//             <strong style={{ fontWeight: "700", color: "#fff" }}>
//               {children}
//             </strong>
//           ),
//           em: ({ children }) => (
//             <em style={{ fontStyle: "italic", opacity: 0.9 }}>{children}</em>
//           ),
//           ul: ({ children }) => (
//             <ul
//               style={{
//                 paddingLeft: "20px",
//                 margin: "6px 0",
//                 listStyleType: "disc",
//               }}
//             >
//               {children}
//             </ul>
//           ),
//           ol: ({ children }) => (
//             <ol style={{ paddingLeft: "20px", margin: "6px 0" }}>{children}</ol>
//           ),
//           li: ({ children }) => (
//             <li style={{ margin: "4px 0", lineHeight: "1.6" }}>{children}</li>
//           ),
//           blockquote: ({ children }) => (
//             <blockquote
//               style={{
//                 borderLeft: "4px solid rgba(255,255,255,0.5)",
//                 paddingLeft: "12px",
//                 fontStyle: "italic",
//                 margin: "10px 0",
//                 opacity: 0.85,
//               }}
//             >
//               {children}
//             </blockquote>
//           ),
//           code({ inline, className, children }) {
//             const language =
//               (className || "").replace("language-", "") || "text";
//             const codeString = String(children).replace(/\n$/, "");
//             if (inline) {
//               return (
//                 <code
//                   style={{
//                     background: "rgba(0,0,0,0.3)",
//                     padding: "2px 6px",
//                     borderRadius: "4px",
//                     fontSize: "13px",
//                     fontFamily: "monospace",
//                   }}
//                 >
//                   {children}
//                 </code>
//               );
//             }
//             return (
//               <div style={styles.codeContainer}>
//                 <div style={styles.codeHeader}>
//                   <span style={styles.codeLanguage}>{language}</span>
//                   <button
//                     style={styles.copyButton}
//                     onClick={() => copyToClipboard(codeString)}
//                   >
//                     {copiedCode === codeString ? "✓ Copied!" : "📋 Copy"}
//                   </button>
//                 </div>
//                 <SyntaxHighlighter
//                   language={language}
//                   style={vscDarkPlus}
//                   customStyle={{
//                     margin: 0,
//                     borderRadius: "0 0 8px 8px",
//                     fontSize: "13px",
//                   }}
//                 >
//                   {codeString}
//                 </SyntaxHighlighter>
//               </div>
//             );
//           },
//           table: ({ children }) => (
//             <table
//               style={{
//                 borderCollapse: "collapse",
//                 width: "100%",
//                 margin: "10px 0",
//                 fontSize: "13px",
//               }}
//             >
//               {children}
//             </table>
//           ),
//           th: ({ children }) => (
//             <th
//               style={{
//                 border: "1px solid rgba(255,255,255,0.2)",
//                 padding: "6px 10px",
//                 background: "rgba(0,0,0,0.3)",
//                 fontWeight: "600",
//               }}
//             >
//               {children}
//             </th>
//           ),
//           td: ({ children }) => (
//             <td
//               style={{
//                 border: "1px solid rgba(255,255,255,0.2)",
//                 padding: "6px 10px",
//               }}
//             >
//               {children}
//             </td>
//           ),
//           hr: () => (
//             <hr
//               style={{
//                 border: "none",
//                 borderTop: "1px solid rgba(255,255,255,0.2)",
//                 margin: "12px 0",
//               }}
//             />
//           ),
//         }}
//       >
//         {text}
//       </ReactMarkdown>
//     </div>
//   );
// }
function MessageContent({ text }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div style={{ lineHeight: "1.7", fontSize: "14px" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "700",
                margin: "12px 0 8px 0",
                paddingBottom: "6px",
                background: "linear-gradient(90deg, #ff6ec7, #ffe57f)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✨ {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                fontSize: "19px",
                fontWeight: "700",
                margin: "10px 0 6px 0",
                background: "linear-gradient(90deg, #79e2ff, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🔹 {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                margin: "8px 0 4px 0",
                color: "#86efac",
              }}
            >
              ▸ {children}
            </h3>
          ),
          p: ({ children }) => (
            <p style={{ margin: "6px 0", lineHeight: "1.7" }}>{children}</p>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: "700", color: "#fde68a" }}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em style={{ fontStyle: "italic", color: "#c4b5fd" }}>
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                paddingLeft: "20px",
                margin: "6px 0",
                listStyleType: "none",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ paddingLeft: "20px", margin: "6px 0" }}>{children}</ol>
          ),
          li: ({ children }) => (
            <li style={{ margin: "5px 0", lineHeight: "1.6" }}>
              <span style={{ color: "#34d399", marginRight: "8px" }}>●</span>
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: "4px solid #a78bfa",
                paddingLeft: "12px",
                fontStyle: "italic",
                margin: "10px 0",
                color: "#e0d7ff",
                background: "rgba(167,139,250,0.08)",
                borderRadius: "0 8px 8px 0",
                padding: "8px 12px",
              }}
            >
              💬 {children}
            </blockquote>
          ),
          code({ inline, className, children }) {
            const language =
              (className || "").replace("language-", "") || "text";
            const codeString = String(children).replace(/\n$/, "");
            if (inline) {
              return (
                <code
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    color: "#f9a8d4",
                  }}
                >
                  {children}
                </code>
              );
            }
            return (
              <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                  <span style={styles.codeLanguage}>⚙️ {language}</span>
                  <button
                    style={styles.copyButton}
                    onClick={() => copyToClipboard(codeString)}
                  >
                    {copiedCode === codeString ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0 0 8px 8px",
                    fontSize: "13px",
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          },
          table: ({ children }) => (
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                margin: "10px 0",
                fontSize: "13px",
              }}
            >
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "6px 10px",
                background: "rgba(167,139,250,0.2)",
                fontWeight: "600",
                color: "#e9d5ff",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "6px 10px",
              }}
            >
              {children}
            </td>
          ),
          hr: () => (
            <hr
              style={{
                border: "none",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                margin: "12px 0",
              }}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
function TypingIndicator({ color }) {
  return (
    <div style={styles.typingIndicator}>
      <div style={{ ...styles.typingDot, background: color }}></div>
      <div
        style={{
          ...styles.typingDot,
          background: color,
          animationDelay: "0.2s",
        }}
      ></div>
      <div
        style={{
          ...styles.typingDot,
          background: color,
          animationDelay: "0.4s",
        }}
      ></div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chats, streamingMessage, isTyping]);

  const send = async () => {
    if (!input.trim() || !active) return;

    setChats((prev) => ({
      ...prev,
      [active.id]: [...(prev[active.id] || []), { from: "user", text: input }],
    }));

    const userMessage = input;
    setInput("");
    setIsTyping(true);
    setStreamingMessage("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: active.id,
          message: userMessage,
          stream: true,
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullMessage = "";

      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.token) {
              fullMessage += parsed.token;
              setStreamingMessage(fullMessage);
            }
            if (parsed.final) {
              setStreamingMessage("");
              setChats((prev) => ({
                ...prev,
                [active.id]: [
                  ...(prev[active.id] || []),
                  { from: "persona", text: parsed.final },
                ],
              }));
              fullMessage = "";
            }
          } catch (err) {
            console.error("Parse error:", err);
          }
        }
      }

      if (fullMessage) {
        setChats((prev) => ({
          ...prev,
          [active.id]: [
            ...(prev[active.id] || []),
            { from: "persona", text: fullMessage },
          ],
        }));
      }

      setStreamingMessage("");
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setStreamingMessage("");

      try {
        const res = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ personaId: active.id, message: userMessage }),
        });
        const data = await res.json();
        setChats((prev) => ({
          ...prev,
          [active.id]: [
            ...(prev[active.id] || []),
            { from: "persona", text: data.reply },
          ],
        }));
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
      }
    }
  };

  if (!active) {
    return (
      <div style={styles.selection}>
        <h1 style={styles.title}>✨ Choose Your Buddy</h1>
        <div style={styles.personaRow}>
          {PERSONAS.map((p) => (
            <div
              key={p.id}
              style={{ ...styles.personaCard, borderColor: p.color }}
              onClick={() => setActive(p)}
            >
              <div style={styles.avatarContainer}>
                <img src={p.img} alt={p.name} style={styles.avatarBig} />
                <div
                  style={{ ...styles.statusBadge, background: "#00ff00" }}
                ></div>
              </div>
              <h3>{p.name}</h3>
              <p>{p.vibe}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.chatWorld}>
        <div style={{ ...styles.header, background: active.color }}>
          <button style={styles.back} onClick={() => setActive(null)}>
            ← Back
          </button>
          <div style={styles.headerInfo}>
            <div style={styles.avatarContainer}>
              <img src={active.img} alt="" style={styles.avatarSmall} />
              <div
                style={{ ...styles.statusBadgeSmall, background: "#00ff00" }}
              ></div>
            </div>
            <div>
              <strong>{active.name}</strong>
              <div style={{ fontSize: 12, opacity: 0.9 }}>
                {isTyping ? "typing..." : "online"}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.chatBody} ref={chatBodyRef}>
          {(chats[active.id] || []).map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.messageRow,
                justifyContent: m.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              {m.from === "persona" && (
                <div style={styles.avatarContainer}>
                  <img src={active.img} alt="" style={styles.avatarChat} />
                  <div
                    style={{ ...styles.statusBadgeTiny, background: "#00ff00" }}
                  ></div>
                </div>
              )}
              <div
                style={{
                  ...styles.bubble,
                  background: m.from === "user" ? "#2d2d44" : active.color,
                }}
              >
                <MessageContent text={m.text} />
              </div>
              {m.from === "user" && (
                <img src={me} alt="" style={styles.avatarChat} />
              )}
            </div>
          ))}

          {isTyping && (
            <div style={styles.messageRow}>
              <div style={styles.avatarContainer}>
                <img src={active.img} alt="" style={styles.avatarChat} />
                <div
                  style={{ ...styles.statusBadgeTiny, background: "#00ff00" }}
                ></div>
              </div>
              <div style={{ ...styles.bubble, background: active.color }}>
                <TypingIndicator color="#fff" />
              </div>
            </div>
          )}

          {streamingMessage && (
            <div style={styles.messageRow}>
              <div style={styles.avatarContainer}>
                <img src={active.img} alt="" style={styles.avatarChat} />
                <div
                  style={{ ...styles.statusBadgeTiny, background: "#00ff00" }}
                ></div>
              </div>
              <div style={{ ...styles.bubble, background: active.color }}>
                <MessageContent text={streamingMessage} />
                <span style={styles.cursor}>|</span>
              </div>
            </div>
          )}
        </div>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder={`Talk to ${active.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={isTyping || !!streamingMessage}
          />
          <button
            style={{
              ...styles.send,
              background: active.color,
              opacity: isTyping || streamingMessage ? 0.5 : 1,
              cursor: isTyping || streamingMessage ? "not-allowed" : "pointer",
            }}
            onClick={send}
            disabled={isTyping || !!streamingMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  selection: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  title: { marginBottom: 30 },
  personaRow: {
    display: "flex",
    gap: 30,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  personaCard: {
    width: 180,
    background: "#151526",
    borderRadius: 22,
    padding: 20,
    textAlign: "center",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "transform 0.2s",
  },
  avatarContainer: { position: "relative", display: "inline-block" },
  avatarBig: { width: 90, height: 90, borderRadius: "50%", marginBottom: 12 },
  statusBadge: {
    position: "absolute",
    bottom: 15,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "3px solid #151526",
  },
  statusBadgeSmall: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "2px solid transparent",
  },
  statusBadgeTiny: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "2px solid #0f0f1a",
  },
  pageContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  chatWorld: {
    height: "90vh",
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    background: "#0f0f1a",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
  },
  header: {
    padding: 16,
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexShrink: 0,
  },
  back: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
  },
  headerInfo: { display: "flex", gap: 10, alignItems: "center" },
  avatarSmall: { width: 40, height: 40, borderRadius: "50%" },
  chatBody: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
    overflowX: "hidden",
  },
  messageRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    width: "100%",
  },
  avatarChat: { width: 32, height: 32, borderRadius: "50%", flexShrink: 0 },
  bubble: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: 18,
    color: "#fff",
    fontSize: 14,
    lineHeight: "1.5",
    wordBreak: "break-word",
  },
  inputRow: {
    display: "flex",
    gap: 12,
    padding: "16px 20px",
    background: "#0f0f1a",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: "14px 18px",
    borderRadius: 14,
    border: "none",
    outline: "none",
    background: "#1b1b2d",
    color: "#fff",
    fontSize: "14px",
  },
  send: {
    border: "none",
    borderRadius: 14,
    padding: "0 24px",
    fontSize: 20,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "opacity 0.2s",
  },
  codeContainer: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    background: "#1e1e1e",
  },
  codeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    background: "#2d2d2d",
    borderBottom: "1px solid #3e3e3e",
  },
  codeLanguage: {
    fontSize: 12,
    color: "#858585",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  copyButton: {
    background: "transparent",
    border: "1px solid #4e4e4e",
    borderRadius: 6,
    padding: "4px 10px",
    color: "#fff",
    fontSize: 11,
    cursor: "pointer",
  },
  typingIndicator: { display: "flex", gap: 4, alignItems: "center" },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    animation: "typingDot 1.4s infinite",
  },
  cursor: { animation: "blink 1s infinite", marginLeft: 2 },
};

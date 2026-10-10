const groups = { tasks: TASKS, cases: CASES };
let currentGroup = "tasks";
let currentId = TASKS[0].id;

const listEl = document.getElementById("list");
const detailEl = document.getElementById("detail");

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderList() {
  listEl.innerHTML = groups[currentGroup].map((item, i) => `
    <button data-id="${item.id}" class="${item.id === currentId ? "active" : ""}">
      <span class="num">${i + 1}.</span>${escapeHtml(item.title)}
    </button>`).join("");
}

function runItem(item, text) {
  try {
    return item.run(text);
  } catch (e) {
    return "Error: " + e.message;
  }
}

function renderDetail() {
  const item = groups[currentGroup].find(x => x.id === currentId);
  detailEl.innerHTML = `
    <h2>${escapeHtml(item.title)}</h2>
    <div class="file">${escapeHtml(item.file)}</div>
    <p class="desc">${escapeHtml(item.description)}</p>
    ${item.note ? `<p class="note">Note: ${escapeHtml(item.note)}</p>` : ""}

    <h3>Pattern</h3>
    <code class="pattern">${escapeHtml(item.pattern)}</code>

    <h3>Python solution</h3>
    <pre>${escapeHtml(item.code)}</pre>

    <h3>Try it ${item.inputHint ? `<span class="hint">· ${escapeHtml(item.inputHint)}</span>` : ""}</h3>
    <textarea id="input" spellcheck="false">${escapeHtml(item.input)}</textarea>
    <div class="actions"><button id="reset">Reset input</button></div>

    <h3>Output</h3>
    <pre class="output" id="output"></pre>
  `;

  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const update = () => { output.textContent = runItem(item, input.value); };
  input.addEventListener("input", update);
  document.getElementById("reset").addEventListener("click", () => {
    input.value = item.input;
    update();
  });
  update();
}

listEl.addEventListener("click", e => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  currentId = btn.dataset.id;
  renderList();
  renderDetail();
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab));
    currentGroup = tab.dataset.group;
    currentId = groups[currentGroup][0].id;
    renderList();
    renderDetail();
  });
});

renderList();
renderDetail();

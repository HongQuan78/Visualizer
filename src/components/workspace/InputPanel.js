import React, { useEffect, useState } from 'react';
import { formatArrayInput, parseNumberArrayInput } from './input/arrayInput';
import { formatGraphInput, parseGraphInput } from './input/graphInput';
import { parsePositiveIntegerInput, parseTreeSequenceInput } from './input/scalarInput';

export default function InputPanel({
  inputConfig,
  sourceData,
  sizeRange,
  algoType,
  onApplyInput,
  onRandomize,
}) {
  if (inputConfig?.kind === 'array') {
    return (
      <ArrayInputEditor
        sourceData={sourceData}
        sizeRange={sizeRange}
        onApplyInput={onApplyInput}
        onRandomize={onRandomize}
      />
    );
  }

  if (inputConfig?.kind === 'graph') {
    return (
      <GraphInputEditor
        sourceData={sourceData}
        sizeRange={sizeRange}
        weighted={inputConfig.weighted}
        onApplyInput={onApplyInput}
        onRandomize={onRandomize}
      />
    );
  }

  if (inputConfig?.kind === 'tree') {
    return (
      <TreeInputEditor
        sourceData={sourceData}
        sizeRange={sizeRange}
        onApplyInput={onApplyInput}
        onRandomize={onRandomize}
      />
    );
  }

  if (inputConfig?.kind === 'dp') {
    return (
      <DPInputEditor
        sourceData={sourceData}
        sizeRange={sizeRange}
        onApplyInput={onApplyInput}
        onRandomize={onRandomize}
      />
    );
  }

  return null;
}

function ArrayInputEditor({
  sourceData,
  sizeRange,
  onApplyInput,
  onRandomize,
}) {
  const [draft, setDraft] = useState(() => formatArrayInput(sourceData));
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(formatArrayInput(sourceData));
    setError('');
  }, [sourceData]);

  function applyDraft() {
    const parsed = parseNumberArrayInput(draft, {
      minLength: sizeRange.min,
      maxLength: sizeRange.max,
    });

    if (parsed.error) {
      setError(parsed.error);
      return;
    }

    setError('');
    onApplyInput(parsed.value);
  }

  return (
    <div className="space-y-2">
      <label className="text-[10px] text-on-surface-variant block">
        Custom Array
      </label>
      <textarea
        className="w-full min-h-20 resize-none bg-surface-container-lowest rounded-lg ghost-border p-2.5 font-mono text-[11px] text-primary outline-none focus:border-primary/40"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="12, 4, 19, 8"
      />
      {error && (
        <div className="text-[10px] font-mono text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-2 py-1">
          {error}
        </div>
      )}
      <div className="flex gap-2">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-lg ghost-border hover:bg-primary/15 transition-colors text-[10px] font-mono uppercase tracking-wider"
          onClick={applyDraft}
        >
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          Apply
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container-low text-on-surface rounded-lg ghost-border hover:bg-surface-bright transition-colors text-[10px] font-mono uppercase tracking-wider"
          onClick={onRandomize}
        >
          <span className="material-symbols-outlined text-sm">shuffle</span>
          Random
        </button>
      </div>
    </div>
  );
}

function GraphInputEditor({
  sourceData,
  sizeRange,
  weighted,
  onApplyInput,
  onRandomize,
}) {
  const [draft, setDraft] = useState(() => formatGraphInput(sourceData));
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(formatGraphInput(sourceData));
    setError('');
  }, [sourceData]);

  function applyDraft() {
    const parsed = parseGraphInput(draft, {
      minNodes: sizeRange.min,
      maxNodes: sizeRange.max,
      weighted,
    });

    if (parsed.error) {
      setError(parsed.error);
      return;
    }

    setError('');
    onApplyInput(parsed.value);
  }

  return (
    <TextInputEditor
      label={weighted ? 'Weighted Edges' : 'Edge List'}
      value={draft}
      onChange={setDraft}
      error={error}
      placeholder={weighted ? 'A-B:4\nB-C:2\nA-C:7' : 'A-B\nB-C\nA-C'}
      onApply={applyDraft}
      onRandomize={onRandomize}
    />
  );
}

function TreeInputEditor({
  sourceData,
  sizeRange,
  onApplyInput,
  onRandomize,
}) {
  const [draft, setDraft] = useState(() => formatArrayInput(sourceData));
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(formatArrayInput(sourceData));
    setError('');
  }, [sourceData]);

  function applyDraft() {
    const parsed = parseTreeSequenceInput(draft, { maxLength: sizeRange.max });

    if (parsed.error) {
      setError(parsed.error);
      return;
    }

    setError('');
    onApplyInput(parsed.value);
  }

  return (
    <TextInputEditor
      label="Insertion Sequence"
      value={draft}
      onChange={setDraft}
      error={error}
      placeholder="50, 25, 75, 10"
      onApply={applyDraft}
      onRandomize={onRandomize}
    />
  );
}

function DPInputEditor({
  sourceData,
  sizeRange,
  onApplyInput,
  onRandomize,
}) {
  const [draft, setDraft] = useState(() => String(sourceData ?? ''));
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(String(sourceData ?? ''));
    setError('');
  }, [sourceData]);

  function applyDraft() {
    const parsed = parsePositiveIntegerInput(draft, {
      min: sizeRange.min,
      max: sizeRange.max,
    });

    if (parsed.error) {
      setError(parsed.error);
      return;
    }

    setError('');
    onApplyInput(parsed.value);
  }

  return (
    <div className="space-y-2">
      <label className="text-[10px] text-on-surface-variant block">
        Target N
      </label>
      <input
        className="w-full bg-surface-container-lowest rounded-lg ghost-border p-2.5 font-mono text-[11px] text-primary outline-none focus:border-primary/40"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="10"
      />
      {error && <InputError>{error}</InputError>}
      <InputActions onApply={applyDraft} onRandomize={onRandomize} />
    </div>
  );
}

function TextInputEditor({
  label,
  value,
  onChange,
  error,
  placeholder,
  onApply,
  onRandomize,
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] text-on-surface-variant block">
        {label}
      </label>
      <textarea
        className="w-full min-h-20 resize-none bg-surface-container-lowest rounded-lg ghost-border p-2.5 font-mono text-[11px] text-primary outline-none focus:border-primary/40"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      {error && <InputError>{error}</InputError>}
      <InputActions onApply={onApply} onRandomize={onRandomize} />
    </div>
  );
}

function InputError({ children }) {
  return (
    <div className="text-[10px] font-mono text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-2 py-1">
      {children}
    </div>
  );
}

function InputActions({ onApply, onRandomize }) {
  return (
    <div className="flex gap-2">
      <button
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-lg ghost-border hover:bg-primary/15 transition-colors text-[10px] font-mono uppercase tracking-wider"
        onClick={onApply}
      >
        <span className="material-symbols-outlined text-sm">play_arrow</span>
        Apply
      </button>
      <button
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container-low text-on-surface rounded-lg ghost-border hover:bg-surface-bright transition-colors text-[10px] font-mono uppercase tracking-wider"
        onClick={onRandomize}
      >
        <span className="material-symbols-outlined text-sm">shuffle</span>
        Random
      </button>
    </div>
  );
}

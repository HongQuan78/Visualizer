import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlaybackPanel from './PlaybackPanel';

function renderPlaybackPanel(overrides = {}) {
  const props = {
    isPlaying: false,
    speed: '1x',
    onTogglePlayback: jest.fn(),
    onStepForward: jest.fn(),
    onStepBackward: jest.fn(),
    onJumpToStep: jest.fn(),
    onJumpToStart: jest.fn(),
    onJumpToEnd: jest.fn(),
    onSpeedChange: jest.fn(),
    currentStepIndex: 2,
    totalSteps: 8,
    operationTypes: [
      { id: 'compare', label: 'Compare', tone: 'compare' },
      { id: 'swap', label: 'Swap', tone: 'swap' },
    ],
    currentOperationBadge: { id: 'compare', label: 'Compare', tone: 'compare' },
    pauseOnOperations: ['swap'],
    onTogglePauseOperation: jest.fn(),
    bookmarks: [1, 5],
    onToggleBookmark: jest.fn(),
    onJumpToBookmark: jest.fn(),
    ...overrides,
  };

  render(<PlaybackPanel {...props} />);
  return props;
}

test('scrubs the timeline to a selected step', () => {
  const props = renderPlaybackPanel();

  fireEvent.change(screen.getByRole('slider', { name: /scrub timeline/i }), {
    target: { value: '6' },
  });

  expect(props.onJumpToStep).toHaveBeenCalledWith(6);
});

test('toggles operation pause filters and bookmarks', async () => {
  const props = renderPlaybackPanel();

  await userEvent.click(screen.getByRole('button', { name: /swap/i }));
  await userEvent.click(screen.getByRole('button', { name: /bookmark current step/i }));
  await userEvent.click(screen.getByRole('button', { name: /jump to bookmark at step 5/i }));

  expect(props.onTogglePauseOperation).toHaveBeenCalledWith('swap');
  expect(props.onToggleBookmark).toHaveBeenCalledWith(2);
  expect(props.onJumpToBookmark).toHaveBeenCalledWith(5);
});

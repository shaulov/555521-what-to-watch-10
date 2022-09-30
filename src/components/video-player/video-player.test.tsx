import { render, screen} from '@testing-library/react';
import {createFakeFilm} from '../../utils/mocks';
import VideoPlayer from './video-player';

const mockFilm = createFakeFilm();

describe('Component: VideoPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
  });

  it('should render correctly', () => {

    render(
      <VideoPlayer film={mockFilm} />
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});

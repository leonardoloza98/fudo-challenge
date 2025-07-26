import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AvatarDisplay } from '../AvatarDisplay';
import { type AvatarId } from '@/lib/avatars';

describe('AvatarDisplay', () => {
  it('renders with default size', () => {
    const { container } = render(
      <AvatarDisplay avatarId="cool-dev" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('40px');
    expect(wrapper.style.height).toBe('40px');
  });

  it('renders with custom size', () => {
    const { container } = render(
      <AvatarDisplay avatarId="cool-dev" size={60} />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('60px');
    expect(wrapper.style.height).toBe('60px');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AvatarDisplay
        avatarId="cool-dev"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  // Test that a non-existent component returns null
  it('renders null for non-existent component', () => {
    // Cast to AvatarId to bypass type checking for this test
    const invalidId = 'non-existent' as AvatarId;
    const { container } = render(
      <AvatarDisplay avatarId={invalidId} />
    );

    expect(container.firstChild).toBeNull();
  });
}); 
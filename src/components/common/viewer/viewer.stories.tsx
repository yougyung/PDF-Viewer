import type { Meta, StoryObj } from '@storybook/react';
import Viewer from './viewer';
import { useState } from 'react';

const meta = {
  title: 'component/common/Viewer',
  component: Viewer,
  tags: ['autodocs'],

  parameters: {
    componentSubtitle: '업로드한 pdf를 노출합니다.',
  },
  decorators: [
    (Story: any) => (
      <label>
        <Story />
      </label>
    ),
  ],
} satisfies Meta<typeof Viewer>;

export default meta;

export const WithFileInput: StoryObj<typeof meta> = {
  args: {
    file: new File(['mock'], 'mock.pdf', { type: 'application/pdf' }),
  },
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setFile(event.target.files[0]);
      }
    };

    return (
      <div>
        <input type="file" accept="application/pdf" onChange={handleChange} style={{ margin: '1rem' }} />
        {file ? <Viewer file={file} /> : <p>PDF 파일을 선택해주세요.</p>}
      </div>
    );
  },
};

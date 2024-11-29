import { useState } from 'react';
import UploadPdf from './components/common/upload-pdf/upload-pdf';
import './style/app.scss';

function App() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('file');
    if (file && file instanceof File) {
      setUploadFile(file);
    }
  };

  return (
    <div className="App">
      <form className="Submit" onSubmit={handleSubmit}>
        <UploadPdf />
        <button className="Submit__Button" type="submit">
          결과 확인하기
        </button>
      </form>
    </div>
  );
}

export default App;

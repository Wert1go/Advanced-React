import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state for our inputs
  const [inputs, setInputs] = useState(initial);

  const intialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [intialValues]);

  // {
  //     name: 'wes',
  //     description: 'new short',
  //     price: 1000
  // }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const inputName = useRef(null);
  const inputNumber = useRef(null);

  const [persons, setPersons] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data);
    })
  },[])

  const generarId = () =>
    persons.length ? Math.max(...persons.map(p => p.id)) + 1 : 1;

  const agregarContacto = (name, number) => {
    if (!name.trim() || !number.trim()) return;
    setPersons([...persons, { name, number, id: generarId() }]);
    inputName.current.value = '';
    inputNumber.current.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700">Phonebook</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <label htmlFor="search" className="block mb-1 font-semibold text-gray-700">
              Search contact
            </label>
            <input
              id="search"
              type="text"
              placeholder="Type a name..."
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Contacts</h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {persons
              .filter(p => new RegExp(filtro, 'i').test(p.name))
              .map(p => (
                <div
                  key={p.id}
                  className="bg-indigo-50 px-4 py-3 rounded-md shadow-sm flex flex-col"
                >
                  <span className="font-semibold text-indigo-900 text-lg">{p.name}</span>
                  <span className="text-gray-700 text-sm">{p.number}</span>
                </div>
              ))}
            {persons.filter(p => new RegExp(filtro, 'i').test(p.name)).length === 0 && (
              <p className="text-sm text-gray-400 text-center">No matches found.</p>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Add new contact</h3>
          <form
            onSubmit={e => {
              e.preventDefault();
              agregarContacto(inputName.current.value, inputNumber.current.value);
            }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">
                Name
              </label>
              <input
                id="name"
                ref={inputName}
                type="text"
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="number" className="block mb-1 font-semibold text-gray-700">
                Number
              </label>
              <input
                id="number"
                ref={inputNumber}
                type="tel"
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              Add Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;

export default function MySelect() {
  return (
    <div className="flex flex-col">
      <label className="text-white text-xs font-medium font-nunito mb-2">
        Idade
      </label>
      <select className="h-[60px] bg-red-600 rounded-2xl px-4 optional:text-white optional:text-base optional:font-nunito optional:font-extrabold outline-none">
        <option value="filhote">Filhote</option>
        <option value="adulto">Adulto</option>
      </select>
    </div>
  );
}

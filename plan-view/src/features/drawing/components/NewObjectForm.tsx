interface Props {
  x: number;
  y: number;

  onCancel: () => void;

  onSave: (
    code: string,
    description: string
  ) => void;
}

export function NewObjectForm({
  x,
  y,
  onCancel,
  onSave,
}: Props) {

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    const formData =
      new FormData(event.currentTarget);

    const code =
      String(
        formData.get("code") ?? ""
      ).trim();

    const description =
      String(
        formData.get("description") ?? ""
      ).trim();

    if (!code) {
      return;
    }

    onSave(
      code,
      description
    );
  };

  return (
    <div className="
      absolute
      bottom-4
      left-4
      right-4
      z-[10000]
      rounded-xl
      bg-white
      p-4
      shadow-xl
    ">

      <h2 className="
        mb-4
        text-lg
        font-bold
      ">
        Nuevo objeto
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >

        <div>

          <label
            htmlFor="object-code"
            className="
              mb-1
              block
              text-sm
              font-medium
            "
          >
            Código
          </label>

          <input
            id="object-code"
            name="code"
            type="text"
            placeholder="Ej. MD 100"
            autoFocus
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              outline-none
              focus:ring-2
            "
          />

        </div>

        <div>

          <label
            htmlFor="object-description"
            className="
              mb-1
              block
              text-sm
              font-medium
            "
          >
            Descripción
          </label>

          <input
            id="object-description"
            name="description"
            type="text"
            placeholder="Ej. MCT - RS31"
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              outline-none
              focus:ring-2
            "
          />

        </div>

        <div className="
          rounded-lg
          bg-gray-100
          p-3
          text-sm
          text-gray-600
        ">

          <div>
            X: {x.toFixed(4)}
          </div>

          <div>
            Y: {y.toFixed(4)}
          </div>

        </div>

        <div className="
          flex
          gap-2
          pt-2
        ">

          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1
              rounded-lg
              border
              px-4
              py-2
              font-medium
            "
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="
              flex-1
              rounded-lg
              bg-gray-900
              px-4
              py-2
              font-medium
              text-white
            "
          >
            Guardar
          </button>

        </div>

      </form>

    </div>
  );
}
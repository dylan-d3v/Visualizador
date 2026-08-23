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
    <div className="bottom-sheet">
  <h2 className="form-title">Nuevo objeto</h2>
  <form onSubmit={handleSubmit} className="form-space">
    <div>
      <label htmlFor="object-code" className="form-label">Código</label>
      <input id="object-code" name="code" type="text" className="form-input" />
    </div>

    <div>
      <label htmlFor="object-description" className="form-label">Descripción</label>
      <input id="object-description" name="description" type="text" className="form-input" />
    </div>

    <div className="coord-box">
      <div>X: {x.toFixed(4)}</div>
      <div>Y: {y.toFixed(4)}</div>
    </div>

    <div className="form-actions">
      <button type="button" onClick={onCancel} className="boton-cancelar">Cancelar</button>
      <button type="submit" className="boton-guardar">Guardar</button>
    </div>
  </form>
</div>

  );
}
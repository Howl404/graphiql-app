import { SchemaField, TypeName } from 'src/types';

type Props = {
  title: string;
  data: SchemaField[];
  handleFieldClick: (params: TypeName) => void;
};

export default function SchemaItemsList({
  title,
  data,
  handleFieldClick,
}: Props) {
  return (
    <>
      <h3>{title}</h3>
      <ul>
        {data.map(({ name, type }) => {
          const properType = {
            typeName: type.name,
            text: type.name,
          };
          if (!type.name && type.ofType?.name) {
            properType.typeName = type.ofType.name;
            properType.text = `[${type.ofType.name}]`;
          }

          return (
            <li
              key={name}
              onClick={() =>
                handleFieldClick({ type: properType.typeName ?? '', name })
              }
            >
              {name}: {properType.text}
            </li>
          );
        })}
      </ul>
    </>
  );
}

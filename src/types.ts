export type AuthFormInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type SchemaResponse = {
  data?: {
    __schema: SchemaRoot;
  };
};

export type SchemaRoot = {
  queryType: SchemaTypeName;
  mutationType?: SchemaTypeName;
  subscriptionType?: SchemaTypeName;
  types: SchemaType[];
  directives: SchemaDirective[];
};

export type SchemaType = {
  name: string | null;
  kind: string;
  description?: string;
  fields?: SchemaField[];
  inputFields?: SchemaInputField[];
  enumValues?: SchemaEnum[];
  ofType?: SchemaType | null;
  possibleTypes?: SchemaType[];
};

type SchemaTypeName = Pick<SchemaType, 'name'>;

export type SchemaField = {
  name: string;
  description?: string;
  args: SchemaArg[];
  type: SchemaType;
  isDeprecated: boolean;
  deprecationReason?: string;
};

export type SchemaArg = {
  name: string;
  description?: string;
  type: SchemaType;
  defaultValue?: string;
};

type SchemaInputField = {
  name: string;
  type: SchemaType;
};

type SchemaEnum = {
  name: string;
  description?: string;
  isDeprecated: boolean;
  deprecationReason?: string;
};

type SchemaDirective = {
  name: string;
  description?: string;
  locations: string[];
  args: SchemaArg[];
};

export type SchemaStackItem = {
  type: string | null;
  name?: string | null;
  args?: SchemaArg[];
  text: string | null;
};

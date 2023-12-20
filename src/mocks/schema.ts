const schema = {
  queryType: {
    name: 'Query',
  },
  mutationType: {
    name: 'Mutation',
  },
  subscriptionType: {
    name: 'Subscription',
  },
  types: [
    {
      kind: 'OBJECT',
      name: 'Capsule',
      description: null,
      fields: [
        {
          name: 'dragon',
          description: null,
          args: [],
          type: {
            kind: 'OBJECT',
            name: 'Dragon',
            ofType: null,
          },
          isDeprecated: true,
          deprecationReason:
            'This is not available in the REST API after MongoDB has been deprecated',
        },
        {
          name: 'id',
          description: null,
          args: [],
          type: {
            kind: 'SCALAR',
            name: 'ID',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'landings',
          description: null,
          args: [],
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'missions',
          description: null,
          args: [],
          type: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'CapsuleMission',
              ofType: null,
            },
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'original_launch',
          description: null,
          args: [],
          type: {
            kind: 'SCALAR',
            name: 'Date',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'reuse_count',
          description: null,
          args: [],
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'status',
          description: null,
          args: [],
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'type',
          description: null,
          args: [],
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
      ],
      inputFields: null,
      interfaces: [],
      enumValues: null,
      possibleTypes: null,
    },

    {
      kind: 'OBJECT',
      name: 'Query',
      description: null,
      fields: [
        {
          name: 'capsule',
          description: null,
          args: [
            {
              name: 'id',
              description: null,
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'ID',
                  ofType: null,
                },
              },
              defaultValue: null,
            },
          ],
          type: {
            kind: 'OBJECT',
            name: 'Capsule',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'capsules',
          description: null,
          type: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'Capsule',
              ofType: null,
            },
          },
          isDeprecated: false,
          deprecationReason: null,
        },
      ],
      inputFields: null,
      interfaces: [],
      enumValues: null,
      possibleTypes: null,
    },
  ],
};

export default schema;

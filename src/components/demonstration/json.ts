/* eslint-disable import/no-anonymous-default-export */
export default {
  joist: {
    memberTypeData: {
      name: 'Member Type',
      properties: {
        required: true,
        options: [
          {
            key: 'solidSawn',
            text: 'Solid Sawn',
            value: 'solidSawn',
            image: {
              avatar: true,
              src: 'assets/images/hs/joist-solid-sawn.svg',
            },
          },
          {
            key: 'glulam',
            text: 'Glulam',
            value: 'glulam',
            image: {
              avatar: true,
              src: 'assets/images/hs/joist-glulam.svg',
            },
          },
          {
            key: 'lsl',
            text: 'Laminated Strand Lumber',
            value: 'lsl',
            image: {
              avatar: true,
              src: 'assets/images/hs/joist-lsl.svg',
            },
          },
          {
            key: 'lvl',
            text: 'Laminated Veneer Lumber',
            value: 'lvl',
            image: {
              avatar: true,
              src: 'assets/images/hs/joist-lvl.svg',
            },
          },
          {
            key: 'psl',
            text: 'Parallel Strand Lumber',
            value: 'psl',
            image: {
              avatar: true,
              src: 'assets/images/hs/joist-psl.svg',
            },
          },
          {
            key: 'ijoist',
            text: 'I-Joist',
            value: 'ijoist',
            image: {
              avatar: true,
              src: 'assets/images/hs/joist-i-joist.svg',
            },
          },
          {
            key: 'floorTruss',
            text: 'Floor Truss',
            value: 'floorTruss',
            image: {
              avatar: true,
              src: 'assets/images/hs/joist-floor-truss.svg',
            },
          },
        ],
      },
      type: 'dropdown',
    },
    materialData: {
      name: 'Download Duration',
      type: 'dropdown',
      properties: {
        required: true,
        filterOn: [
          {
            default: 'memberTypeData',
            format: 'memberTypeData',
          },
        ],
        options: [],
        optionsFilterOn: {
          glulam: [
            { key: 'df', text: 'DF (Douglas Fir)', value: 1 },
            { key: 'hf', text: 'HF (Hem Fir)', value: 2 },
            { key: 'sp', text: 'SP (Southern Pine)', value: 3 },
            { key: 'spf', text: 'SPF (Spruce Pine Fir)', value: 4 },
          ],
          solidSawn: [
            { key: 'df', text: 'DF (Douglas Fir)', value: 1 },
            { key: 'spf', text: 'SPF (Spruce Pine Fir)', value: 4 },
          ],
          ijoist: [
            { text: 'DF (Douglas Fir)', value: 11 },
            { text: 'SPF (Spruce Pine Fir)', value: 19 },
          ],
          lvl: [
            { key: 'dfsp', text: 'DF/SP (Douglas fir or Southern Pine)', value: 25 },
            { key: 'spfhf', text: 'SPF/HF (Spruce-pine-fir or Hem Fir)', value: 26 },
          ],
        },
      },
    },
    widthData: {
      name: 'Width ',
      type: 'dropdown',
      properties: {
        required: true,
        filterOn: [
          {
            default: 'memberTypeData',
            format: 'memberTypeData',
          },
        ],
        options: [],
        optionsFilterOn: {
          solidSawn: [
            { text: '2x (1 1/2")', value: '2x' },
            { text: '3x (2 1/2")', value: '3x' },
            { text: '4x (3 1/2")', value: '4x' },
            { text: '6x (5 1/2")', value: '6x' },
            { text: '8x (7 1/2")', value: '8x' },
          ],
          glulam: [
            { text: '3 1/8" x', value: 3.125 },
            { text: '3 1/2" x', value: 3.5 },
            { text: '5 1/8" x', value: 5.125 },
            { text: '5 1/2" x', value: 5.5 },
            { text: '6 3/4" x', value: 6.75 },
            { text: '7" x', value: 7 },
            { text: '7 1/4" x', value: 7.25 },
            { text: '8 3/4" x', value: 8.75 },
            { text: '9 1/4" x', value: 9.25 },
            { text: '10 3/4" x', value: 10.75 },
          ],
          lsl: [
            { text: '1 1/2" x', value: 1.5 },
            { text: '1 3/4" x', value: 1.75 },
            { text: '3 1/2" x', value: 3.5 },
            { text: '5 1/4" x', value: 5.25 },
            { text: '7" x', value: 7 },
          ],
          psl: [
            { text: '1 3/4" x', value: 1.75 },
            { text: '2 11/16" x', value: 2.6875 },
            { text: '3 1/2" x', value: 3.5 },
            { text: '5 1/4" x', value: 5.25 },
            { text: '7" x', value: 7 },
          ],
          ijoist: [
            { text: '1 1/2"', value: 1.5 },
            { text: '1 3/4"', value: 1.75 },
            { text: '2"', value: 2 },
            { text: '2 1/16"', value: 2.0625 },
            { text: '2 1/4"', value: 2.25 },
            { text: '2 5/16"', value: 2.3125 },
            { text: '2 1/2"', value: 2.5 },
            { text: '2 9/16"', value: 2.5625 },
            { text: '3 1/2"', value: 3.5 },
          ],
        },
      },
    },
    username: {
      type: 'text',
      name: 'Username',
      properties: {
        required: true,
        validate: [
          {
            pattern: /^[a-zA-Z0-9]{4,}$/,
            description: 'Name at least 4 characters',
          },
        ],
        defaultValue: 'pampam',
      },
    },
    password: {
      type: 'text',
      name: 'Passwrod',
      properties: {
        format: 'password',
        required: true,
        validate: [
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
            description: 'Password at least 8 characters and have ....',
          },
        ],
      },
    },
    email: {
      name: 'Email',
      type: 'text',
      properties: {
        required: true,
        format: 'email',
      },
    },
    phone: {
      name: 'Phone',
      type: 'text',
      properties: {
        required: true,
        format: 'phone',
        validate: [
          {
            pattern: /^[0-9]{8,15}$/,
            description: 'Phone wrong format',
          },
        ],
      },
    },
    quantity: {
      name: 'Quanity',
      type: 'number',
      properties: {
        format: 'number',
        required: true,
        min: 1,
        max: 10,
        defaultValue: 2,
      },
    },
    lumberFinish: {
      name: 'Lumber Finish',
      type: 'checkbox',
      properties: {
        text: 'Rough Sawn',
        defaultValue: true,
      },
    },
    price: {
      name: 'Price',
      type: 'range',
      properties: {
        text: 'Price',
        required: true,
        defaultValue: -5,
        min: -30,
        step: 2,
        max: 90,
      },
    },
  },
};

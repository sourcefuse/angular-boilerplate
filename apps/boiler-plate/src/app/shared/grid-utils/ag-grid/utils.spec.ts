import {textFilterModelToWhere} from './utils';

describe('GridUtils', () => {
  describe('textFilterModelToWhere', () => {
    it('should return a where clause for a model with only search', () => {
      const model = {
        testField: {
          filter: JSON.stringify(searchObject),
        },
      };
      const where = textFilterModelToWhere(model);
      expect(where).toEqual({
        testField: {
          ilike: `%${searchObject.search}%`,
        },
      });
    });
    it('should return a where clause for a model with only filter', () => {
      const model = {
        testField: {
          filter: JSON.stringify(filterObject),
        },
      };
      const where = textFilterModelToWhere(model);
      expect(where).toEqual({
        testField: {
          inq: filterObject.filter,
        },
      });
    });
    it('should return a where clause for a model with neither filter or search', () => {
      const model = {
        testField: {},
      };
      const where = textFilterModelToWhere(model);
      expect(where).toEqual({});
    });
    it('should return a where clause for a model with both filter and search', () => {
      const model = {
        testField: {
          filter: JSON.stringify({
            ...searchObject,
            ...filterObject,
          }),
        },
      };
      const where = textFilterModelToWhere(model);
      expect(where).toEqual({
        and: [
          {
            testField: {
              ilike: `%${searchObject.search}%`,
            },
          },
          {
            testField: {
              inq: filterObject.filter,
            },
          },
        ],
      });
    });
    it('should return a where clause for a model with multiple filter and search params', () => {
      const model = {
        testField: {
          filter: JSON.stringify({
            ...searchObject,
            ...filterObject,
          }),
        },
        otherField: {
          filter: JSON.stringify({
            ...secondSearchObject,
            ...secondFilterObject,
          }),
        },
      };
      const where = textFilterModelToWhere(model);
      expect(where).toEqual({
        and: [
          {
            or: [
              {
                testField: {
                  ilike: `%${searchObject.search}%`,
                },
              },
              {
                otherField: {
                  ilike: `%${secondSearchObject.search}%`,
                },
              },
            ],
          },
          {
            and: [
              {
                testField: {
                  inq: filterObject.filter,
                },
              },
              {
                otherField: {
                  inq: secondFilterObject.filter,
                },
              },
            ],
          },
        ],
      });
    });
  });
});

const searchObject = {
  search: 'searchword',
};

const filterObject = {
  filter: ['active', 'draft'],
};

const secondSearchObject = {
  search: 'secondword',
};

const secondFilterObject = {
  filter: ['AMEC'],
};

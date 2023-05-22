import { required } from './required.decorator';
import { validate } from './validate.decorator';

@validate()
class MockModel {
  @required()
  x: string;
  constructor(data: MockModel) {
    this.x = data.x;
  }
}

@validate()
class MockModelNotParamerterized {
  @required()
  x: string;
  constructor() {
    this.x = '';
  }
}

describe('@validate', () => {
  let errorLogged = false;
  // sonarignore:start
  let orginalConsoleErrorFn: (message?: any, ...optionalParams: any[]) => void;
  // sonarignore:end

  beforeAll(() => {
    // sonarignore:start
    orginalConsoleErrorFn = console.error;
    console.error = () => {
      errorLogged = true;
    };
    // sonarignore:end
  });

  afterAll(() => {
    // sonarignore:start
    console.error = orginalConsoleErrorFn;
    // sonarignore:end
  });

  beforeEach(() => {
    errorLogged = false;
  });

  it('should log error when required property is undefined', () => {
    let x: string | undefined;
    // sonarignore:start
    new MockModel({
      x: x as string,
    });
    // sonarignore:end
    expect(errorLogged).toBeTrue();
  });

  it('should log error when required property is null', () => {
    let x: string | null = null;
    // sonarignore:start
    new MockModel({
      x: x as unknown as string,
    });
    // sonarignore:end
    expect(errorLogged).toBeTrue();
  });

  it('should not log anything in case all required properties are present', () => {
    // sonarignore:start
    new MockModel({
      x: 'test',
    });
    // sonarignore:end
    expect(errorLogged).toBeFalse();
  });

  it('should throw error if used with non parameterized constructor', () => {
    expect(() => {
      // sonarignore:start
      new MockModelNotParamerterized();
      // sonarignore:end
    }).toThrow(
      new Error(`Can only use validate decorator with paramterized constructor`)
    );
  });
});

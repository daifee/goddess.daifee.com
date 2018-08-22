'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/extend/context.test.js', () => {
  it('renderError(err, options)', () => {
    const context = app.mockContext();
    const error = new Error();
    error.code = 500;
    context.renderError(error);
    assert(context.status === 500);
    assert(context.body);
  });

  describe('throw(code = 99999, message = "", properties = {})', () => {
    it('框架异常', () => {
      const context = app.mockContext();

      try {
        context.throw(409);
        assert.fail('不可能运行到这里');
      } catch (error) {
        assert(error instanceof Error);
        assert(error.status === 409);
        assert(error.code === 409);
        assert(error.message);
      }
    });

    it('controller层异常', () => {
      const context = app.mockContext();

      try {
        context.throw(10008);
        assert.fail('不可能运行到这里');
      } catch (error) {
        assert(error instanceof Error);
        assert(error.status === 400);
        assert(error.code === 10008);
        assert(error.message);
      }
    });

    it('service层异常', () => {
      const context = app.mockContext();

      try {
        context.throw(20039);
        assert.fail('不可能运行到这里');
      } catch (error) {
        assert(error instanceof Error);
        assert(error.status === 500);
        assert(error.code === 20039);
        assert(error.message);
      }
    });
  });
});

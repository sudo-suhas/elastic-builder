'use strict';

const { util: { constructorWrapper } } = require('../core');

/** Script type classes */

const InlineScript = require('./inline-script'),
    StoredScript = require('./stored-script'),
    FileScript = require('./file-script');

exports.InlineScript = InlineScript;
exports.inlineScript = constructorWrapper(InlineScript);

exports.StoredScript = StoredScript;
exports.storedScript = constructorWrapper(StoredScript);

exports.FileScript = FileScript;
exports.fileScript = constructorWrapper(FileScript);

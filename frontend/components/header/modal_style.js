import React from 'react';
var Modal = require("react-modal");

export default (
  {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(0, 0, 0, 0.4)'
    },
    content : {
      position                   : 'absolute',
      top                        : '45%',
      left                       : '50%',
      right                      : '50%',
      bottom                     : '550%',
      height                     : '420px',
      maxHeight                  : '420px',
      width                      : '380px',
      margin                     : '-210px -180px',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      outline                    : 'none',
    }
  }
);

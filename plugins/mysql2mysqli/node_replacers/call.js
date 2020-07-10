 
const callReplacer = (writer,node, indent,  self) => {

  const replaceFalse = () => {
    return writer(node.what, indent) +
      '(' + self.params(node.arguments, indent, self) + ')' + ' ? '
      + writer(node.what, indent) +
      '(' + self.params(node.arguments, indent, self) + ')' + ' : -1'
  };

  const strToLower = () => {
    return 'strtolower(' + writer(node.what, indent) +
      '(' + self.params(node.arguments, indent, self) + '))'
  };

 /* const replace_mysql_connect = (options) => {
    const { host, user, pass, dbname } = self._currentMysqlParams;
    const connectVar = self._currentConnectVar;
    let hostName, port, socket;
    if (host.indexOf(':') > -1 || host.indexOf('/') > -1) {
      [hostName, port] = host.split(':');
      const tempArr = port.split('/');
      port = tempArr.shift();
      socket = tempArr.join('/');
    }
    return    `$GLOBALS['${connectVar}'] = ` +
    `mysqli_connect(${hostName}, ${user}, ${pass}, ${dbname}`
    + port ? `,${port}` : ``
    + socket ? `,${socket}` : `` + `);\n`
  }*/

  // const replace_mysql_select_db = (options) => {
  //   const { host, user, pass, dbname } = self._currentMysqlParams
  //   const connectVar = self._currentConnectVar
  //   const arg = node.right && node.right && node.right.arguments[0]
  //   if (dbname === arg) {
  //     return writer(node.left) + `= $GLOBALS['${connectVar}']`
  //   } else {
  //     const { host, user, pass, dbname } = self._currentMysqlParams
  //     const connectVar = self._currentConnectVar
  //     let hostName, port, socket
  //     if (host.indexOf(':') > -1 || host.indexOf('/') > -1) {
  //       [hostName, port] = host.split(':')
  //       const tempArr = port.split('/')
  //       port = tempArr.shift()
  //       socket = tempArr.join('/')
  //     }
  //     return `$GLOBALS['${connectVar}'] = ` +
  //     `mysqli_connect(${hostName}, ${user}, ${pass}, ${dbname}` + port ? `,${port}` : ``
  //     + socket ? `,${socket}` : `` + `);\n`
  //   }
  // }

/*
  const replace_mysql_fetch_field =  (options) => {
    let [firstArg, secondArg] = node.arguments;
    if (!secondArg) return `${writer(options.leftAssign)}` +
      `= mysqli_fetch_field(${writer(firstArg)}));`
    return `for(x=0; x<${writer(secondArg)}; x++) {
      mysqli_fetch_field(${writer(firstArg)});
    }
    ${writer(options.leftAssign)} = mysqli_fetch_field(${writer(firstArg)});`
  }
*/

/*  const replace_mysql_result = (options) =>  {
    const [result,num,field] = node.arguments;
    const finfo = this._createTempVariable();
    const f = this._createTempVariable();
    return `mysqli_data_seek(${writer(result)}, ${writer(num)});
            if( !empty(${writer(field)}) ) {
              while(${finfo} = mysqli_fetch_field( ${writer(result)} )) {
                if( ${writer(field)} == ${finfo}->name ) {
                  ${f} = mysqli_fetch_assoc( ${writer(result)} );
                  ${writer(options.leftAssign)} =  $f[ ${writer(field)} ];
                }
              }
            } else {
              ${f} = mysqli_fetch_array(${writer(result)} );
              ${writer(options.leftAssign)} = ${f}[0];
            }
            `
  }*/

/*
  const replace_is_a = () => {
    const [object, classObject] = node.arguments;
    return `${writer(object)} instanceof ${writer(classObject)} `
  }
*/

/*
  const replace_convert_object_to_array = ( ) => {
    let   useArgs = [], space, raw;
    let args = node.arguments;
    function processElement(indent) {
      return function (arg) {
        return `(array)${writer(arg, indent)};`
      };
    }
    if (args && args.length > 0) {
      useArgs = args.map(processElement(indent));
    }
    raw = useArgs.join();
    if ((raw.indexOf("\n") > -1
      && raw.substr(0, raw.indexOf("\n")).length > 80)
      || (raw.indexOf("\n") === -1 && raw.length > 80)) {
      useArgs = args.map(processElement(indent + self.indent));
      space = self.nl + indent + self.indent;
      args = space + useArgs.join(',' + space) + self.nl + indent;
    } else {
      args = useArgs.join(',' + self.ws);
    }
    return node.what.name + `(${args});`
  }
*/

  const calls = {
    'ip2long': () => replaceFalse(),
    'get_class': () => strToLower(),
    'get_parent_class': () => strToLower(),
    // 'mysql_connect': (options) => replace_mysql_connect(options),
    // 'mysql_select_db': (options) => replace_mysql_select_db(options),
    // "mysql_fetch_field" : (options) => replace_mysql_fetch_field(options),
    // "mysql_result" : (options) => replace_mysql_result(options),
    // "is_a" : () => replace_is_a(),
    // "natsort": () => replace_convert_object_to_array(),
  };
  if (calls[node.what.name]) return calls[node.what.name];
  return false;
};
module.exports = callReplacer;
module.exports = (template, element) => {
  let output = template.replaceAll("{%PRODUCTNAME%}", element.productName);
  output = output.replaceAll("{%ID%}", element.id);
  output = output.replaceAll("{%IMAGE%}", element.image);
  output = output.replaceAll("{%FROM%}", element.from);
  output = output.replaceAll("{%NUTRIENTS%}", element.nutrients);
  output = output.replaceAll("{%QUANTITY%}", element.quantity);
  output = output.replaceAll("{%PRICE%}", element.price);
  output = output.replaceAll("{%DESCRIPTION%}", element.description);
  if (!element.organic) {
    output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");
  }
  return output;
};

const getTemplateId = (variantId, variantMap) => {
  const [variantObject] = variantMap.filter(
    (variant) => variant?.variant_id === variantId
  );

  const templateId = variantObject?.templates[0]?.template_id;

  return templateId;
};

const findVariantTemplateData = (templateId, templates) => {
  const templateData = templates?.filter((template) => 
    template?.template_id === templateId
  );

  return templateData;
};

export {
  getTemplateId,
  findVariantTemplateData
}
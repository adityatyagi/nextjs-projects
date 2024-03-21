import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { QuestionsSelectModel } from "@/types/form";
import React from "react";

type Props = {
  element: QuestionsSelectModel;
};

const FormField = ({ element }: Props) => {
  const components = {
    Input: () => <Input type="text" />,
    Switch: () => <Switch />,
    Textarea: () => <Textarea />,
    RadioGroup: () => <RadioGroup />,
    Select: () => <Select />,
  };

  if (!element.fieldType) {
    return null;
  }

  return (
    <div>
      {components[element.fieldType] ? components[element.fieldType]() : null}
    </div>
  );
};

export default FormField;

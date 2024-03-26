import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FieldOptionsSelectModel, QuestionsSelectModel } from "@/types/form";
import React from "react";
import { Label } from "@/components/ui/label";

type Props = {
  element: QuestionsSelectModel & {
    fieldOptions: Array<FieldOptionsSelectModel>;
  };
};

const FormField = ({ element }: Props) => {
  const components = {
    Input: () => <Input type="text" />,
    Switch: () => <Switch />,
    Textarea: () => <Textarea />,
    RadioGroup: () => (
      <RadioGroup defaultValue="comfortable">
        {element.fieldOptions.map((option) => {
          return (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
          );
        })}
      </RadioGroup>
    ),
    Select: () => (
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {element.fieldOptions.map((option: FieldOptionsSelectModel) => {
            return (
              <SelectItem
                key={`${option.text} ${option.value}`}
                value={`answerId_${option.id}`}
              >
                {option.text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    ),
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

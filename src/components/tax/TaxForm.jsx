import React from "react";
import { Formik, Form, Field } from "formik";
import "./tax.css";

const TaxForm = ({ items }) => {
  const groupedItems = groupItemsByCategory(items);

  return (
    <section className="tax-form">
      <Formik
        initialValues={{
          taxName: "",
          taxRate: "",
          applicableItems: [],
          appliedTo: "some",
        }}
        onSubmit={(values) => {
          console.log({
            applicable_items: values.applicableItems,
            applied_to: values.appliedTo,
            name: values.taxName,
            rate: parseFloat(values.taxRate) / 100,
          });
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="form-inputs">
              <Field name="taxName" type="text" placeholder="Name" />
              <Field name="taxRate" type="number" placeholder="tax %" />
            </div>

            <div className="tax-cal">
              <label>
                <Field
                  type="radio"
                  name="appliedTo"
                  value="all"
                  onChange={() => {
                    setFieldValue("appliedTo", "all");
                    setFieldValue(
                      "applicableItems",
                      items.map((item) => item.id)
                    );
                  }}
                />
                Apply to all items in collection
              </label>
              <label>
                <Field
                  type="radio"
                  name="appliedTo"
                  value="some"
                  onChange={() => {
                    setFieldValue("appliedTo", "some");
                    setFieldValue("applicableItems", []);
                  }}
                />
                Apply to specific items
              </label>
            </div>
            <div>
              {Object.entries(groupedItems).map(([category, items]) => (
                <div
                  key={category}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                  }}
                >
                  <div className="tax-categories-header">
                    <input
                      type="checkbox"
                      checked={items.every((item) =>
                        values.applicableItems.includes(item.id)
                      )}
                      onChange={() =>
                        toggleCategory(category, items, setFieldValue, values)
                      }
                    />
                    {category}
                  </div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{ marginLeft: "20px", padding: "5px 0 5px 0" }}
                    >
                      <input
                        type="checkbox"
                        name="applicableItems"
                        value={item.id}
                        checked={values.applicableItems.includes(item.id)}
                        className={
                          values.appliedTo === "all" ? "forced-blue" : ""
                        }
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="form-btn">
              <button type="submit">
                Apply tax to {values.applicableItems.length} item(s)
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

const groupItemsByCategory = (items) => {
  return items.reduce((acc, item) => {
    const category = item.category?.name || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};

const toggleCategory = (category, items, setFieldValue, values) => {
  const allSelected = items.every((item) =>
    values.applicableItems.includes(item.id)
  );

  if (allSelected) {
    setFieldValue(
      "applicableItems",
      values.applicableItems.filter(
        (id) => !items.some((item) => item.id === id)
      )
    );
  } else {
    setFieldValue("applicableItems", [
      ...values.applicableItems,
      ...items.map((item) => item.id),
    ]);
  }
};

export default TaxForm;

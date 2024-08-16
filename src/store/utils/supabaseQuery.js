import { supabase } from "../../config/supabase";

const supabaseBaseQuery = async ({ query, table, method = "GET", body }) => {
  let result;

  switch (method) {
    case "GET":
      result = await supabase.from(table).select(query);
      break;
    case "POST":
      result = await supabase.from(table).insert(body);
      break;
    case "PATCH":
      result = await supabase.from(table).update(body).eq("id", body.id);
      break;
    case "DELETE":
      result = await supabase.from(table).delete().eq("id", body.id);
      break;
    default:
      throw new Error("Unsupported method");
  }

  if (result.error) {
    return { error: result.error };
  }

  return { data: result.data };
};

export { supabaseBaseQuery };

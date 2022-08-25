using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class StatisticTemplate
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int IStatisticElementID { get; set; }
        public bool IS_TrinhDien { get; set; }
        public DateTime CreatedTime { get; set; }
        public int CreatedByID { get; set; }
        public DateTime UpdateTime { get; set; }
        public int UpdateByID { get; set; }
        public int BaseTemplate { get; set; }
    }

    public class StatisticElement
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime CreatedTime { get; set; }
        public int CreatedByID { get; set; }
        public DateTime UpdateTime { get; set; }
        public int UpdateByID { get; set; }
    }

    public class StatisticTemplateRole
    {
        public int ID { get; set; }
        public int RoleID { get; set; }
        public int TemplateID { get; set; }
        public int BaseTemplate { get; set; }
    }

    public class StatisticTemplateRoleResult
    {
        public string RoleID { get; set; }
        public int TemplateID { get; set; }
    }

    public class StatisticTemplateElement
    {
        public int ID { get; set; }
        public int TemplateID { get; set; }
        public int ElementID { get; set; }
        public string Value { get; set; }
        public int RoleID { get; set; }
    }

    public class BaseStatisticTemplate
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}

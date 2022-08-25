using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Threading.Tasks;

namespace API.PdfUltility
{
    internal class CustomAssemblyLoadContext : AssemblyLoadContext
    {
        public IntPtr LoadUnmanagedLibrary(string absPath)
        {
            return LoadUnmanagedDll(absPath);
        }

        protected override IntPtr LoadUnmanagedDll(string unmanagedDllName)
        {
            return LoadUnmanagedDllFromPath(unmanagedDllName);
        }

        protected override Assembly Load(AssemblyName assemblyName)
        {
            throw new NotImplementedException();
        }
    }
}
